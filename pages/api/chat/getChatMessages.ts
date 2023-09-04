import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prismadb";
import { GetChatMessagesResponse } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetChatMessagesResponse>
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    const { cid: chatId } = req.query;

    //Check if authenticated
    if (!session) {
      res.status(400).json({ success: false });
      return;
    }

    //Find Chat
    const chat = await prisma.chatSession.findUnique({
      where: {
        id: chatId as string,
      },
      include: {
        users: true,
        messages: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!chat) {
      res.status(400).json({ success: false });
      return;
    }

    if (!chat.users.some((user) => user.id === session.user?.id)) {
      res.status(400).json({ success: false });
      return;
    }

    res.status(200).json({
      messages: chat.messages.sort(
        (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()
      ),
      success: true,
    });
  } else {
    res.status(400).json({ success: false });
  }
}
