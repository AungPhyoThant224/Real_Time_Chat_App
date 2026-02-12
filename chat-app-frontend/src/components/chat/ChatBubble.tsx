import { Message } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useChatStore } from "@/store/useChatStore";

export const ChatBubble = ({ message }: { message: Message }) => {
  const { user } = useAuthStore();
  const { selectedConversationId } = useChatStore();
  const isMe = user?.role === "USER" ? message.receiverId !== user?.id : selectedConversationId === message.receiverId ;

  return (
    <div className={cn("chat", isMe ? "chat-end" : "chat-start")}>
      <div className="chat-header opacity-50 text-[10px] mb-1">
        {isMe ? "You" : message.sender?.email}
        <time className="ml-1">{format(new Date(message.createdAt), "p")}</time>
      </div>
      <div className={cn(
        "chat-bubble text-sm",
        isMe ? "chat-bubble-primary" : "chat-bubble-secondary"
      )}>
        {message.content}
      </div>
    </div>
  );
};