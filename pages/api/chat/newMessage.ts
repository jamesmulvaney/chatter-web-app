import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prismadb";
import { pusherServer } from "../../../lib/pusher";
import { MessagesWithAuthor } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  message?: MessagesWithAuthor;
  success: boolean;
  reason?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const { chatId, message } = req.body;

    //Check if user exists and is part of the chat
    if (!session) {
      res.status(400).json({
        success: false,
        reason: "You need to be logged in to send chat messages.",
      });
      return;
    }

    const chatSession = await prisma.chatSession.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: true,
      },
    });

    if (!chatSession) {
      res
        .status(400)
        .json({ success: false, reason: "You are not part of that chat." });
      return;
    }

    if (!chatSession?.users.some((user) => user.id === session!.user!.id!)) {
      res
        .status(400)
        .json({ success: false, reason: "You are not part of that chat." });
      return;
    }

    //Create new message in db
    try {
      const newMessage = await prisma.messages.create({
        data: {
          chatSessionId: chatId,
          authorId: session!.user!.id!,
          body: message,
        },
        include: {
          author: true,
        },
      });

      res.status(200).json({ message: newMessage, success: true });

      //Send the recipient the new message via pusher channels
      await pusherServer.trigger(chatId, "new-message", newMessage);

      return;
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ success: false, reason: "Error sending message." });
      return;
    }
  } else {
    res.status(400).json({ success: false });
    return;
  }
}
