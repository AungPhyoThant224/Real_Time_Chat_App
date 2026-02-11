import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { socketAuthMiddleware } from "./middlewares/socketAuth.middleware.js";
import { registerChatHandlers } from "./modules/chat/chat.socket.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  connectionStateRecovery:{
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  }
});

io.use(socketAuthMiddleware);

io.on('connection', (socket) => {
  registerChatHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log(`User ${socket.data.user.email} disconnected`);
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
