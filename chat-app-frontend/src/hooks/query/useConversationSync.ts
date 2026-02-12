import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import SocketService from "@/socket/socket";
import { PaginatedResponse, Conversation } from "@/types";

export const useConversationSync = () => {
  const queryClient = useQueryClient();
  const socket = SocketService.getInstance();

  useEffect(() => {
    socket.on(
      "new_user_message",
      (payload: { senderId: number; content: string }) => {
        queryClient.setQueryData(["conversations"], (oldData: any) => {
          if (!oldData) return oldData;
          const newMessage = payload.content;
          const senderId = payload.senderId;
          let targetConversation: Conversation | null = null;

          const newPages = oldData.pages.map(
            (page: PaginatedResponse<Conversation>) => {
              const filteredData = page.data.filter((conv) => {
                if (conv.userId === senderId) {
                  targetConversation = {
                    ...conv,
                    lastMessage: newMessage,
                    updatedAt: new Date().toISOString(),
                  };
                  return false;
                }
                return true;
              });
              return { ...page, data: filteredData };
            },
          );

          if (targetConversation) {
            newPages[0].data.unshift(targetConversation);
          } else {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
          }
          return { ...oldData, pages: newPages };
        });
      },
    );
    return () => {
      socket.off("new_user_message");
    };
  }, [socket, queryClient]);
};
