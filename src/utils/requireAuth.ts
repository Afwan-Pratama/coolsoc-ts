import { getSession } from "next-auth/react";

export const requireAuth = async (ctx: any, path: string, cb: any) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: path,
        permanent: false,
      },
    };
  }

  return cb({ session });
};
