import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  success: boolean;
  reason?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const { username } = JSON.parse(req.body);

    if (!session) {
      res.status(401).json({
        success: false,
        reason: "You must be logged in to change your username.",
      });
      return;
    }

    //Check if username is in use
    const isNameInUse = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (isNameInUse) {
      res
        .status(400)
        .json({ success: false, reason: "That username is already in use." });
      return;
    }

    //Update user
    try {
      await prisma.user.update({
        where: {
          id: session.user?.id,
        },
        data: {
          username,
        },
      });

      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, reason: "Error updating username." });
    }
  } else {
    res
      .status(405)
      .json({ success: false, reason: `Method ${req.method} is not allowed.` });
  }
}
