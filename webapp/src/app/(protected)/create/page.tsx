"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import useRefetch from "@/hooks/use-refetch";
import Image from "next/image";

type IFormInput = {
  repoUrl: string;
  projectName: string;
  gitHubToken?: string;
};

const Create = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const createProject = api.project.createProject.useMutation();
  //   const checkCredits = api.project.checkCredits.useMutation();
  const refetch = useRefetch();

  function onSubmitFn(data: IFormInput) {
    const { projectName, repoUrl, gitHubToken } = data;
    console.log(projectName, repoUrl, gitHubToken);

    // if (!!checkCredits.data) {
    createProject.mutate(
      { name: projectName, repoUrl: repoUrl, gitHubToken: gitHubToken },
      {
        onSuccess: (data) => {
          toast.success(
            `Project created successfully with ${data?.cost} Credits`,
          );
          void refetch();
          reset();
        },
        onError: (error) => {
          console.log(error);
          const err = error.message || "Failed to create project: ";
          toast.error(err);
        },
      },
    );
    return true;
  }


  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 md:flex-row">
      <Image
        alt="image"
        height={400}
        width={200}
        src={
          "https://cdni.iconscout.com/illustration/premium/thumb/coder-illustration-download-in-svg-png-gif-file-formats--programmer-developer-developing-programming-businex-colorful-pack-business-illustrations-2895977.png"
        }
        className="h-80 w-auto md:-ml-28"
      />
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Link your GitHub Repository
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the URL of the GitHub repository you want to link to CodeLens.
          </p>
        </div>
        <div className=""></div>
        <div>
          <form onSubmit={handleSubmit(onSubmitFn)}>
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              required
            />
            <div className="h-2"></div>
            <Input
              {...register("repoUrl", { required: true })}
              type="url"
              placeholder="GitHub Repository URL"
              required
            />
            <div className="h-2"></div>
            <Input
              {...register("gitHubToken")}
              placeholder="GitHub access token"
            />
            <Button
              type="submit"
              className="mt-4"
              disabled={createProject.isPending}
            >
              {createProject.isPending && <Spinner className="mr-2" />}
              {createProject.isPending ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
