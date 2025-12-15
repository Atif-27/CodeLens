"use client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";
import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Image from "next/image";

const CommitLog = () => {
  const { projectId, project } = useProject();
  const { data: commits, error } = api.project.getCommits.useQuery(
    { projectId },
    {
      enabled: !!project?.githubUrl,
    },
  );

  if (!project?.githubUrl) {
    return <div className="text-sm text-gray-500">No project selected.</div>;
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Error loading commits: {error.message}
      </div>
    );
  }

  if (!commits?.length) {
    return (
      <div className="text-sm text-gray-500">
        No commits found for this repository.
      </div>
    );
  }

  return (
    <>
      <p className="pb-2 text-sm text-gray-500">Latest commits</p>
      <ul className="space-y-6">
        {commits
          .sort(
            (a, b) =>
              new Date(b.commitDate).getTime() -
              new Date(a.commitDate).getTime(),
          )
          .map((commit, commitIdx) => (
            <li key={commit.id} className="relative flex gap-x-4">
              <div
                className={cn(
                  commitIdx === commits.length - 1 ? "h-6" : "-bottom-6",
                  "absolute top-0 left-0 flex w-6 justify-center",
                )}
              >
                <div className="w-px translate-x-1 bg-gray-200"></div>
              </div>

              <>
                <Image
                  height={100}
                  width={100}
                  src={commit.commitAuthorAvatar}
                  alt={"commit Avatar"}
                  className="relative mt-4 size-8 flex-none rounded-full bg-gray-50"
                />
                <div className="ring-border flex-auto rounded-md p-3 ring-1 ring-inset">
                  <div className="flex justify-between gap-x-4">
                    <Link
                      href={`${project?.githubUrl}/commit/${commit.commitHash}`}
                      target="_blank"
                      className="text-muted-foreground py-0.5 text-xs leading-5"
                    >
                      <span className="text-foreground font-medium">
                        {commit.commitAuthorName}
                      </span>{" "}
                      <span className="inline-flex items-center">
                        Commited
                        <ExternalLink className="ml-1 size-4" />
                      </span>
                    </Link>
                    <p className="text-muted-foreground text-sm">
                      {new Date(commit.commitDate).toLocaleDateString(
                        undefined,
                        { day: "numeric", month: "long", year: "numeric" },
                      )}
                    </p>
                  </div>
                  <span className="text-foreground font-semibold">
                    {commit.commitMessage}
                  </span>
                  <div
                    className="text-muted-foreground mt-2 text-sm leading-6 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: commit.summary
                        .replace(/(\*{2})(.*?)\1/g, "<b>$2</b>")
                        .replace(/(['"`])(.*?)\1/g, "<b>$2</b>"),
                    }}
                  />
                </div>
              </>
            </li>
          ))}
      </ul>
    </>
  );
};

export default CommitLog;
