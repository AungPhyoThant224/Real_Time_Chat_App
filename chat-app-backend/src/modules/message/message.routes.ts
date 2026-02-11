import { Router } from "express";
import { getMessageHistory } from "./message.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/history", authMiddleware, getMessageHistory);

export default router;