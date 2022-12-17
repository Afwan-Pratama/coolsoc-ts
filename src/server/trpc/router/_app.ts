import { router } from "../trpc";
import { authRouter } from "./auth";
import { commentRouter } from "./comments";
import { exampleRouter } from "./example";
import { likeRouter } from "./likes";
import { postsRouter } from "./posts";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  posts: postsRouter,
  comments: commentRouter,
  likes: likeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
