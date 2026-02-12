import { useInfiniteQuery } from "@tanstack/react-query";
import { messageService } from "@/services/chatService";
import { Message, PaginatedResponse } from "@/types";

export const useMessages = (receiverId: number | null) => {
  return useInfiniteQuery({
    queryKey: ["messages", receiverId],
    queryFn: ({ pageParam = 1 }) =>
      messageService.getAll({
        params: { otherUserId: receiverId, page: pageParam, limit: 20 },
      }),
    enabled: !!receiverId,
    getNextPageParam: (lastPage: PaginatedResponse<Message>) => {
      const { currentPage, hasMore } = lastPage.meta;
      if (!hasMore) {
        return undefined;
      }
      return currentPage + 1;
    },
    initialPageParam: 1,
  });
};
