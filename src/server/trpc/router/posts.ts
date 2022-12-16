import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const postsRouter = router({
  createPost: publicProcedure
    .input(z.object({ userId: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.posts.create({
        data: input,
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.posts.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        comments: {
          select: {
            content: true,
          },
        },
      },
    });
  }),
});
