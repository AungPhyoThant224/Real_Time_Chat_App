import { Request, Response } from "express";
import { getConversations } from "./conversation.service.js";

export const getConversationList = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Access Denied" });
    }
    const { page = 1, limit = 10 } = req.query as any;
    const conversations = await getConversations({ page, limit });
    res.json({
      message: "Conversations fetched successfully.",
      data: conversations,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};
