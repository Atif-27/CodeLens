import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useProject from "@/hooks/use-project";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProjectFallback() {
  const { projects, projectId, setProjectId } = useProject();
  return (
    <div className="flex min-h-screen w-full flex-col justify-center p-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Please Select a project</CardTitle>
          <CardAction>
            <Link href={"/create"}>
              <Button
                size={"sm"}
                variant="default"
                className="flex w-fit cursor-pointer px-2"
              >
                <Plus />
                Create New Project
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          {projects && projects?.length > 0 ? (
            <div>
              <h1 className="text-lg font-bold text-gray-400">Your Projects</h1>
              <div className="space-y-4 pt-4">
                {projects?.map((project) => {
                  return (
                    <div
                      key={project.id}
                      onClick={() => {
                        setProjectId(project.id);
                      }}
                    >
                      <div className="cursor-pointer border p-4">
                        <div className="flex space-x-4 text-2xl">
                          <div>
                            <span className="p-3">{project.name[0]}</span>
                          </div>
                          <span>{project.name}</span>
                          <div>{project.githubUrl}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <h1>You dont have any projects</h1>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
