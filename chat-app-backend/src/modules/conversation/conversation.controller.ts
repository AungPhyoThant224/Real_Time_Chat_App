import { Request, Response } from "express";
import { getConversations } from "./conversation.service.js";

export const getConversationList = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Access Denied" });
    }
    
    const conversations = await getConversations({ page, limit });
    res.json({
      message: "Conversations fetched successfully.",
      data: conversations,
      meta: {
        currentPage: page,
        limit,
        total: conversations.length,
        hasMore: conversations.length === limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};
