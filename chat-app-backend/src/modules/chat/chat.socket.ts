import { Server, Socket } from "socket.io";
import { saveMessage } from "./chat.service.js";
import { prisma } from "../../../prisma/client.js";

export const registerChatHandlers = (io: Server, socket: Socket) => {
  const { id, role, email } = socket.data.user;

  socket.join(`user:${id}`);

  if (role === "ADMIN") {
    socket.join("admins");
    console.log(`Admin ${email} joined.`);
  }

  socket.on("message_to_admin", async (data: { content: string }) => {

    const adminUser = await prisma.user.findFirst({
        where: {role: "ADMIN"}
    })
    
    const msg = await saveMessage({
      senderId: id,
      receiverId: adminUser!.id,
      content: data.content,
    });

    io.to("admins").emit("new_user_message", {
      msg,
      senderEmail: email,
    });
  });

  socket.on(
    "admin_reply",
    async (data: { receiverId: number; content: string }) => {
      if (role !== "ADMIN") return;

      const msg = await saveMessage({
        senderId: id,
        receiverId: data.receiverId,
        content: data.content,
      });

      io.to(`user:${data.receiverId}`).emit("receive_reply", msg);
    },
  );
};
