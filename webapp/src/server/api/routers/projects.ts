import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import ingestRepo from "@/lib/kafka";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(z.object({ name: z.string(), repoUrl: z.string(), gitHubToken: z.string().optional(), })).mutation(async ({ ctx, input }) => {
        const { name, repoUrl, gitHubToken = process.env.GITHUB_ACCESS_TOKEN } = input;
        console.log(input);
        const project = await ctx.db.project.create({
            data: {
                name,
                githubUrl: repoUrl,
                userToProject: {
                    create: {
                        userId: ctx.user.userId!,
                    }
                }
            },
        });
        const repo = /github\.com\/([^/]+\/[^/]+)/.exec(repoUrl)?.[1];

        await pollCommits(project.id);
        await ingestRepo(repo!, gitHubToken!);
        return project;
    }),


    getProjects: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.project.findMany({
            where: {
                userToProject: {
                    some: {
                        userId: ctx.user.userId!
                    }
                }
                , deletedAt: null
            },
        });
    }),


    getCommits: protectedProcedure.input(z.object({ projectId: z.string() })).query(async ({ ctx, input }) => {
        const { projectId } = input;

        console.log(`polling commits for project ${projectId}`);

        pollCommits(projectId)
            .then(() => {
                console.log(`Successfully polled commits for project ${projectId}`);
            })
            .catch((error) => {
                console.error(`Error polling commits for project ${projectId}`, error);
            });

        return await ctx.db.commit.findMany({
            where: { projectId },
        });
    }),


    getMyCredits: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.user.findUnique({
            where: {
                id: ctx.user.userId!
            },
        });
    })

});
