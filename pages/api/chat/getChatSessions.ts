import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prismadb";
import { GetChatSessionsResponse } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetChatSessionsResponse>
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(400).json({ success: false });
      return;
    }

    //Find User
    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
      include: {
        chatSessions: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!user) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ chatSessions: user?.chatSessions, success: true });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
