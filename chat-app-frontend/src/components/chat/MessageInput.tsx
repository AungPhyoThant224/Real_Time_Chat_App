"use client";

import { useState } from "react";
import SocketService from "@/socket/socket";
import { Send } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "@/types";

export const MessageInput = ({
  receiverId,
  role,
}: {
  receiverId: number;
  role: string;
}) => {
  const [text, setText] = useState("");
  const socket = SocketService.getInstance();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const handleSend = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const eventName = role === "ADMIN" ? "admin_reply" : "message_to_admin";

    const tempMessage: Message = {
      id: Date.now(),
      content: text,
      senderId: user!.id,
      receiverId: receiverId,
      createdAt: new Date().toISOString(),
    };

    socket.emit(eventName, {
      receiverId,
      content: text,
    });

    queryClient.setQueryData(["messages", receiverId], (oldData: any) => {
      if (!oldData) return oldData;
      const newPages = [...oldData.pages];
      newPages[0] = {
        ...newPages[0],
        data: [tempMessage, ...newPages[0].data],
      };
      return { ...oldData, pages: newPages };
    });

    setText("");
  };

  return (
    <form
      onSubmit={handleSend}
      className="p-4 border-t border-base-300 flex gap-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="input input-bordered flex-1 focus:input-primary"
      />
      <button type="submit" className="btn btn-primary btn-square">
        <Send size={20} />
      </button>
    </form>
  );
};
