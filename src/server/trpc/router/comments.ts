import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const commentRouter = router({
  createComment: publicProcedure
    .input(
      z.object({ userId: z.string(), postId: z.string(), content: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.comments.create({
        data: input,
      });
    }),
  getCommentByPostId: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.prisma.comments.findMany({
        where: {
          postId: input,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.comments.findMany();
  }),
});
