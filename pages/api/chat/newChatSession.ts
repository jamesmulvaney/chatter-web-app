import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prismadb";
import { NewChatSessionRes } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewChatSessionRes>
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const { targetUsername } = req.body;

    if (!session) {
      res.status(401).json({
        error: {
          field: "session",
          reason: "You need to be logged in to start a chat session.",
        },
      });

      return;
    }

    //Make sure the target exists
    const target = await prisma.user.findUnique({
      where: {
        username: targetUsername,
      },
    });

    if (!target) {
      res.status(404).json({
        error: {
          field: "targetUsername",
          reason: "User was not found. Please double check the username.",
        },
      });

      return;
    }

    //Prevent the user from starting a chat with themselves
    if (target.id === session.user?.id) {
      res.status(400).json({
        error: {
          field: "targetUsername",
          reason: "You cannot start a chat with yourself. Sorry...",
        },
      });

      return;
    }

    //Make sure a chat between the two users does not already exist
    const chatDoesExist = await prisma.chatSession.findMany({
      where: {
        AND: [
          {
            users: {
              some: {
                id: session.user?.id,
              },
            },
          },
          {
            users: {
              some: {
                id: target.id,
              },
            },
          },
        ],
      },
    });

    if (chatDoesExist.length > 0) {
      res.status(400).json({
        error: {
          field: "targetUsername",
          reason: "You already have an active chat session with that user.",
        },
      });

      return;
    }

    //Create the new chat
    try {
      const newChatSession = await prisma.chatSession.create({
        data: {
          users: {
            connect: [{ id: session.user?.id }, { id: target.id }],
          },
        },
      });

      if (!newChatSession) {
        res.status(500).json({
          error: {
            field: "unknown",
            reason:
              "Failed to create a new chat session. Please try again later.",
          },
        });

        return;
      }

      res.status(200).json({ chatSessionId: newChatSession.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: {
          field: "unknown",
          reason:
            "Failed to create a new chat session. Please try again later.",
        },
      });
    }
  } else {
    res.status(405).json({
      error: {
        field: "unknown",
        reason: `Method ${req.method} is not allowed.`,
      },
    });
  }
}
