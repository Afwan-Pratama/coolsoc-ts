import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const postsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.posts.findMany();
  }),
});
