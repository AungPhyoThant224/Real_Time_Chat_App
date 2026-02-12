import { Server, Socket } from "socket.io";
import { getAdmin, saveMessage } from "./chat.service.js";
import { updateConversation } from "../conversation/conversation.service.js";

export const registerChatHandlers = (io: Server, socket: Socket) => {
  const { id, role, email } = socket.data.user;
  let admin: any = null;

  socket.join(`user:${id}`);

  if (role === "ADMIN") {
    socket.join("admins");
    console.log(`Admin ${email} joined.`);
  }

  socket.on("message_to_admin", async (data: { content: string }) => {
    if (!admin) {
      admin = await getAdmin();
    }

    const msg = await saveMessage({
      senderId: id,
      receiverId: admin!.id,
      content: data.content,
    });

    await updateConversation({
      userId: id,
      lastMessage: data.content,
    });

    io.to("admins").emit("new_user_message", msg);
  });

  socket.on(
    "admin_reply",
    async (data: { receiverId: number; content: string }) => {
      if (role !== "ADMIN") return;

      if (!admin) {
        admin = await getAdmin();
      }

      const msg = await saveMessage({
        senderId: admin!.id,
        receiverId: data.receiverId,
        content: data.content,
      });

      await updateConversation({
        userId: data.receiverId,
        lastMessage: data.content,
      });

      io.to(`user:${data.receiverId}`).emit("receive_reply", msg);
    },
  );
};
