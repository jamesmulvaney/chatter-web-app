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
      res
        .status(401)
        .json({
          success: false,
          reason: "You need to be logged in to do that.",
        });
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
      res
        .status(404)
        .json({ success: false, reason: "Chat session not found." });
      return;
    }

    if (!chat.users.some((user) => user.id === session.user?.id)) {
      res
        .status(404)
        .json({ success: false, reason: "Chat session not found." });
      return;
    }

    res.status(200).json({
      messages: chat.messages.sort(
        (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()
      ),
      success: true,
    });
  } else {
    res
      .status(405)
      .json({ success: false, reason: `Method ${req.method} is not allowed.` });
  }
}
