import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios";
import { aiSummariseCommit } from "./gemini";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,

});

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
};

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
    const [owner, repo] = githubUrl.split("/").slice(-2);
    if (!owner || !repo) {
        throw new Error("Invalid github url");
    }
    const { data } = await octokit.rest.repos.listCommits({
        owner,
        repo,
    });

    const sortedCommits = [...data].sort(
        (a, b) =>
            new Date(b.commit.author?.date ?? 0).getTime() -
            new Date(a.commit.author?.date ?? 0).getTime()
    );

    return sortedCommits.slice(0, 10).map((commit) => ({
        commitHash: commit.sha,
        commitMessage: commit.commit.message ?? "",
        commitAuthorName: commit.commit.author?.name ?? "",
        commitAuthorAvatar: commit.author?.avatar_url ?? "",
        commitDate: commit.commit.author?.date ?? "",
    }));
};


export const pollCommits = async (projectId: string) => {
    const { project, githubUrl } = await fetchProjectGithubUrl(projectId);

    const commitHashes = await getCommitHashes(githubUrl);
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);

    const summaryResponse = await Promise.allSettled(
        unprocessedCommits.map((commit) => summariseCommit(githubUrl, commit.commitHash))
    );

    const summaries = summaryResponse.map((response, index) => {
        if (response.status === "fulfilled") return response.value;

        console.error(`Failed to summarise commit ${unprocessedCommits[index]?.commitHash}:`, response.reason);
        return "";
    });

    const commits = await db.commit.createMany({
        data: unprocessedCommits.map((commit, index) => ({
            projectId,
            commitHash: commit.commitHash,
            commitMessage: commit.commitMessage,
            commitAuthorName: commit.commitAuthorName,
            commitAuthorAvatar: commit.commitAuthorAvatar,
            commitDate: commit.commitDate,
            summary: summaries[index] ?? "",
        })),
    });
    console.log(`commits created: ${commits.count}`);
    return commits;
};


async function summariseCommit(githubUrl: string, commitHash: string) {
    try {
        const response = await axios.get<string>(`${githubUrl}/commit/${commitHash}.diff`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
            responseType: "text",
        });
        const data = response.data;
        const summary = await aiSummariseCommit(data);
        return summary ?? "No summary available";
    } catch (err) {
        console.error("Failed to fetch commit diff:", err);
        return "No summary available";
    }
}

async function filterUnprocessedCommits(prjectId: string, commitHashes: Response[]) {
    // saved in database for project
    const processedCommits = await db.commit.findMany({
        where: {
            projectId: prjectId,
        },
        select: {
            commitHash: true,
        },
    });
    const unprocessedCommits = commitHashes.filter((commit) => !processedCommits.some((c) => c.commitHash === commit.commitHash));
    return unprocessedCommits;
}

async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            githubUrl: true
        }
    });
    if (!project?.githubUrl) {
        throw new Error("Project has no github url");
    }
    return {
        project, githubUrl: project?.githubUrl
    };
}