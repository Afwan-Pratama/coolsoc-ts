import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const posts = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await prisma.comments.findMany();

  res.status(200).json(posts);
};

export default posts;
