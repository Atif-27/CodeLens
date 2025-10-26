import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                repoUrl: z.string(),
                gitHubToken: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { name, repoUrl } = input;
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
    })
});
