import { createServer } from "http";
import { Server } from "socket.io";
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

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});