import { prisma } from "../../../prisma/client.js";
import { SaveMessage } from "./chat.type.js";

export const saveMessage = async (
  {senderId,receiverId,content} : SaveMessage
) => {
  return await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
  });
};

export const getAdmin = async () => {
  return await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });
}
