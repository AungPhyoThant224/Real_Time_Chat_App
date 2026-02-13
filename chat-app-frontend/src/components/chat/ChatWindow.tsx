"use client";

import { useEffect, useRef } from "react";
import { useMessages } from "@/hooks/query/useMessageQuery";
import { useChatStore } from "@/store/useChatStore";
import { ChatBubble } from "./ChatBubble";
import { MessageInput } from "./MessageInput";
import { useAuthStore } from "@/store/useAuthStore";

export const ChatWindow = () => {
  const { user } = useAuthStore();
  const { selectedConversationId, setScrollStatus, scrollStatus } =
    useChatStore();
  const activeChatId = user?.role === "ADMIN" ? selectedConversationId : 1;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessages(activeChatId);

  const messages = data?.pages.flatMap((page) => page.data) || [];

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (scrollStatus.status && (selectedConversationId === scrollStatus.id || user?.role === "USER")) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      setScrollStatus(false, null);
    }
  }, [messages.length, scrollStatus]);

  if (user?.role === "ADMIN" && !selectedConversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-base-content/50 font-medium">
        Select a customer to start chatting.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-base-100 overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col-reverse custom-scrollbar scroll-smooth"
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        <div
          ref={observerTarget}
          className="h-10 w-full flex justify-center py-4"
        >
          {isFetchingNextPage ? (
            <span className="loading loading-dots loading-md opacity-50"></span>
          ) : hasNextPage ? (
            <div className="h-1" />
          ) : (
            <span className="text-[10px] uppercase tracking-widest opacity-30 font-bold">
              Beginning of conversation
            </span>
          )}
        </div>
      </div>

      <MessageInput receiverId={activeChatId!} role={user?.role!} />
    </div>
  );
};
