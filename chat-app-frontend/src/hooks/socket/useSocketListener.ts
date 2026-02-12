import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import SocketService from "@/socket/socket";
import { useAuthStore } from "@/store/useAuthStore";

export const useSocketListener = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const socket = SocketService.getInstance();

  useEffect(() => {
    if (!user) return;

    const eventToListen =
      user.role === "ADMIN" ? "new_user_message" : "receive_reply";

    socket.on(eventToListen, (newMessage) => {
      queryClient.setQueryData(
        ["messages", newMessage.senderId],
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: any, index: number) => {
              if (index === 0) {
                return {
                  ...page,
                  data: [newMessage, ...page.data],
                };
              }
              return page;
            }),
          };
        },
      );

      if (user.role === "ADMIN") {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      }
    });

    return () => {
      socket.off(eventToListen);
    };
  }, [user, socket, queryClient]);
};
