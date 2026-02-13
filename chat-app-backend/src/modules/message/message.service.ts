import { prisma } from "../../../prisma/client.js";

export const getMessages = async ({
  userId,
  otherUserId,
  cursor,
  limit,
}: {
  userId: number;
  otherUserId: number;
  cursor: number | null;
  limit: number;
}) => {
  // const offset = (page - 1) * limit;

  return await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
      ...(cursor ? { id: { lt: cursor } } : {})
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    include: {
      sender: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });
};
