import jwt from "jsonwebtoken";
import { ExtendedError, Socket } from "socket.io";

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError) => void,
) => {
  // const token = socket.handshake.auth.token;
  const token = socket.handshake.headers.authorization;

  if (!token) return next(new Error("Authentication error"));

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) return next(new Error("Authentication error"));
    socket.data.user = decoded;
    next();
  });
};
