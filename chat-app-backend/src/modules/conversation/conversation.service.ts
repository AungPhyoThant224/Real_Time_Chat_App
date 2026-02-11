import { prisma } from "../../../prisma/client.js";

export const getConversations = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const offset = (page - 1) * limit;

  return await prisma.conversation.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
};

export const updateConversation = async ({
  userId,
  lastMessage,
}: {
  userId: number;
  lastMessage: string;
}) => {
  return await prisma.conversation.upsert({
    where: { userId },
    update: { lastMessage, updatedAt: new Date() },
    create: { userId, lastMessage },
  });
};
