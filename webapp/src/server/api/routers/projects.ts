import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import KafkaIngestRepo from "@/lib/kafka";
import RedisIngestRepo from "@/lib/redis";

import axios from "axios";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(z.object({ name: z.string(), repoUrl: z.string(), gitHubToken: z.string().optional(), })).mutation(async ({ ctx, input }) => {
        try {
            const { name, repoUrl, gitHubToken = process.env.GITHUB_ACCESS_TOKEN } = input;
            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.user.userId!
                }
            });
            const repoName = /github\.com\/([^/]+\/[^/]+)/.exec(repoUrl)?.[1];

            const { data } = await axios.get<{ cost: number; }>("http://localhost:5000/cost", {
                params: {
                    accessToken: gitHubToken,
                    repoName: repoName
                }
            });

            const cost = Number(data.cost) || 0;
            if (user && user?.credit < cost) throw new Error("You dont have enought credit to create Project");
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


            await pollCommits(project.id);
            const env = process.env.ENV === "DEVELOPMENT";
            await (env ? KafkaIngestRepo(repoName!, gitHubToken!, project.id) : RedisIngestRepo(repoName!, gitHubToken!, project.id));

            await ctx.db.user.update({
                where: {
                    id: ctx.user.userId!
                },
                data: {
                    credit: {
                        decrement: cost
                    }
                }
            });
            return { ...project, cost };
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);

                throw new Error(error.message || "Failed Creating Project");
            }
        }
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

    archiveProject: protectedProcedure.input(z.object({ projectId: z.string() })).mutation(async ({ ctx, input }) => {
        return await ctx.db.project.update({
            where: {
                id: input.projectId
            },
            data: {
                deletedAt: new Date()
            }
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
    }),

    getMyTransactions: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.stripeTransactions.findMany({
            where: {
                userId: ctx.user.userId!
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    })



});
