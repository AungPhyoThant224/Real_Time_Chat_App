import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 8080;

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) return next(new Error("Authentication error"));

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decode: any) => {
    if (err) return next(new Error("Authentication error"));

    (socket as any).user = decode;
    next();
  });
});

io.on("connection", (socket) => {
  const user = (socket as any).user;
  console.log("${user.role} connected: ${user.username}");
  socket.join(user.role);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
