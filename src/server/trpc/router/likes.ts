import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const likeRouter = router({
  createLike: publicProcedure
    .input(z.object({ userId: z.string(), postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.likes.create({
        data: input,
      });
    }),
  deleteLike: publicProcedure
    .input(z.string().optional())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.likes.delete({
        where: {
          id: input,
        },
      });
    }),
});
