import { Request, Response } from "express";
import { getMessages } from "./message.service.js";
import { getAdmin } from "../chat/chat.service.js";

export const getMessageHistory = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const otherUserId = parseInt(req.query.otherUserId as string);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const admin = await getAdmin();
    if (currentUser.role === "USER") {
      if (!admin) {
        return res.status(403).json({ error: "Access denied." });
      }

      const messages = await getMessages({
        userId: currentUser.id,
        otherUserId: admin.id,
        page,
        limit,
      });

      return res.json({
        message: "Messages fetched successfully.",
        data: messages,
        meta: {
          page,
          limit,
          total: messages.length,
          hasMore: messages.length === limit,
        },
      });
    }

    const messages = await getMessages({
      userId: currentUser.id,
      otherUserId: otherUserId,
      page,
      limit,
    });

    res.json({
      message: "Messages fetched successfully.",
      data: messages,
      meta: {
        page,
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
