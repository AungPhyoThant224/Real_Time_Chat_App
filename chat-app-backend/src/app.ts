import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import conversationRoutes from "./modules/conversation/conversation.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes)

export default app;
