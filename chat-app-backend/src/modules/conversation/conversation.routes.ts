import { Router } from "express";
import { getConversationList } from "./conversation.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getConversationList);

export default router;