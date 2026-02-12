"use client";

import { useEffect, useRef, useState } from "react";
import { useMessages } from "@/hooks/query/useMessageQuery";
import { useChatStore } from "@/store/useChatStore";
import { ChatBubble } from "./ChatBubble";
import { MessageInput } from "./MessageInput";
import { useAuthStore } from "@/store/useAuthStore";

export const ChatWindow = () => {
  const { user } = useAuthStore();
  const { selectedConversationId } = useChatStore();

  const activeChatId = user?.role === "ADMIN" ? selectedConversationId : 1;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessages(activeChatId);
  const [prevFirstMessageId, setPrevFirstMessageId] = useState<number | null>(
    null,
  );
  const [isReady, setIsReady] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const messages = data?.pages
    .flatMap((page) => page.data)
    .slice()
    .reverse();

  useEffect(() => {
    setIsReady(false);
    setPrevFirstMessageId(null);
  }, [activeChatId]);

  useEffect(() => {
    const lastMessageId = messages?.[messages.length - 1]?.id;
    if (lastMessageId === prevFirstMessageId) {
      return;
    }

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      setPrevFirstMessageId(lastMessageId!);
    }

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [messages?.length, isReady, activeChatId]);

  useEffect(() => {
    if (prevFirstMessageId === 0 || !isReady) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isReady]);

  if (user?.role === "ADMIN" && !selectedConversationId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a customer to help.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-base-100 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        <div ref={observerTarget} className="h-10 w-full flex justify-center">
          {isFetchingNextPage && <span className="loading loading-dots"></span>}
        </div>

        <div className="mt-auto">
          {messages?.map((msg, index) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </div>

        <div ref={bottomRef} className="h-1" />
      </div>

      <MessageInput receiverId={activeChatId!} role={user?.role!} />
    </div>
  );
};
