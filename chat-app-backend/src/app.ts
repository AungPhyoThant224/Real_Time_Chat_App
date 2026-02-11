import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import conversationRoutes from "./modules/conversation/conversation.routes.js";
import messageRoutes from "./modules/message/message.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

export default app;
