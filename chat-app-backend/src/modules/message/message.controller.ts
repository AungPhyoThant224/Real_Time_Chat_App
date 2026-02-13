import { Request, Response } from "express";
import { getMessages } from "./message.service.js";
import { getAdmin } from "../chat/chat.service.js";

export const getMessageHistory = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const otherUserId = parseInt(req.query.otherUserId as string);
    const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : null;
    const limit = parseInt(req.query.limit as string) || 10;

    const admin = await getAdmin();
    if (!admin) {
      return res.status(500).json({ error: "Internal server error." });
    }

      const currentUserId = currentUser.role === "USER"? currentUser.id : admin.id;
      const targetUserId = currentUser.role === "USER" ? admin.id : otherUserId;

      const messages = await getMessages({
        userId: currentUserId,
        otherUserId: targetUserId,
        cursor,
        limit,
      });

      return res.json({
        message: "Messages fetched successfully.",
        data: messages,
        meta: {
          nextCursor: messages.length === limit ? messages[messages.length - 1].id : null,
          limit,
          total: messages.length,
          hasMore: messages.length === limit,
        },
      });

  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error." });
  }
};
