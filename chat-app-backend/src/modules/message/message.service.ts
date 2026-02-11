import { prisma } from "../../../prisma/client.js";

export const getMessages = async ({
  userId,
  otherUserId,
  page,
  limit,
}: {
  userId: number;
  otherUserId: number;
  page: number;
  limit: number;
}) => {
  const offset = (page - 1) * limit;

  return await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: offset,
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
