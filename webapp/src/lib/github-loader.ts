import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";

export const loadGithubRepo = async (repoUrl: string, githubToken?: string) => {
    const loader = new GithubRepoLoader(
        repoUrl,
        {
            accessToken: githubToken ?? process.env.GITHUB_ACCESS_TOKEN!,
            branch: "main",
            recursive: true,
            unknown: "warn",
            maxConcurrency: 5,
            ignoreFiles: [
                "package-lock.json",
                "yarn.lock",
                "pnpm-lock.yaml",
                "bun.lockb",
            ],
        }
    );
    const docs = await loader.load();
    return docs;
};
