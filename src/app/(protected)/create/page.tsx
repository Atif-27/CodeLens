"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
// import useRefetch from "@/hooks/use-refetch";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";

type IFormInput = {
  repoUrl: string;
  projectName: string;
  gitHubToken?: string;
};

const Create = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  //   const createProject = api.project.createProject.useMutation();
  //   const checkCredits = api.project.checkCredits.useMutation();
  //   const refetch = useRefetch();

  function onSubmitFn(data: IFormInput) {
    const { projectName, repoUrl, gitHubToken } = data;
    console.log(projectName, repoUrl, gitHubToken);

    // if (!!checkCredits.data) {
    //   createProject.mutate(
    //     { name: projectName, repoUrl, gitHubToken },
    //     {
    //       onSuccess: () => {
    //         toast.success("Project created successfully");
    //         redirect("/dashboard");
    //       },
    //       onError: (error) => {
    //         console.log("error");
    //         toast.error("Failed to create project");
    //       },
    //     },
    //   );
    // } else {
    //   checkCredits.mutate({
    //     githubUrl: repoUrl,
    //     githubToken: gitHubToken!,
    //   });
    // }

    // window.alert(JSON.stringify(data,null,2))
    return true;
  }

  //   const hasEnoughCredits = checkCredits?.data?.credits
  //     ? checkCredits.data.fileCount <= checkCredits.data.credits
  //     : true;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 md:flex-row">
      {/* <Image
        alt="image"
        height={20}
        width={20}
        src={
          "https://cdni.iconscout.com/illustration/premium/thumb/coder-illustration-download-in-svg-png-gif-file-formats--programmer-developer-developing-programming-businex-colorful-pack-business-illustrations-2895977.png"
        }
        className="h-80 w-auto md:-ml-28"
      /> */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Link your GitHub Repository
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the URL of the GitHub repository you want to link to DevSync.
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
            {/* {!!checkCredits.data && (
              <>
                <div className="mt-4 rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700">
                  <div className="flex items-center gap-2">
                    <Info />
                    <p className="text-sm">
                      You will be charged{" "}
                      <strong>{checkCredits.data?.fileCount}</strong> credits
                      for this repository.
                    </p>
                  </div>
                  <p className="ml-8 text-sm text-blue-600">
                    You have <strong>{checkCredits.data?.credits}</strong>{" "}
                    credits remaining.
                  </p>
                </div>
              </>
            )} */}
            <div className="h-2"></div>
            <Input
              {...register("gitHubToken")}
              placeholder="GitHub access token"
            />
            <Button
              type="submit"
              className="mt-4"
              //   disabled={
              //     createProject.isPending ||
              //     !!checkCredits.isPending ||
              //     !hasEnoughCredits
              //   }
            >
              {/* {!!checkCredits.data ? "Create Project" : "Check Credits"} */}
              Create Project
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
