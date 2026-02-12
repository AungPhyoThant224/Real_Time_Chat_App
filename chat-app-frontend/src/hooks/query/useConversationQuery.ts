import { useInfiniteQuery } from "@tanstack/react-query";
import { conversationService } from "@/services/chatService";
import { PaginatedResponse, Conversation } from "@/types";

export const useConversation = () => {
    return useInfiniteQuery({
        queryKey: ["conversations"],
        queryFn: ({ pageParam = 1 }) => conversationService.getAll({params: { page: pageParam, limit: 10 }}),
        getNextPageParam: (lastPage: PaginatedResponse<Conversation>) => {
            const { currentPage, limit } = lastPage.meta;
            if (lastPage.data.length < limit) {
                return undefined;
            }
            return currentPage + 1;
        },
        initialPageParam: 1,
    })
}