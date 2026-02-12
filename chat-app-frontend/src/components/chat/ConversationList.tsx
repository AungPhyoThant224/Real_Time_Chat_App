"use client";
import { useConversation } from "@/hooks/useConversationQuery";
import { useConversationSync } from "@/hooks/useConversationSync";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
import { formatDistanceToNow } from "date-fns";
import React from "react";

const ConversationList = () => {
  const { selectedConversationId, setSelectedConversationId } = useChatStore();
  const {
    data,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useConversation();

  useConversationSync();

  const observerTarget = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col h-full bg-base-100 border-r border-base-300 w-80">
      <div className="p-4 font-bold text-xl border-b border-base-300">
        Messages
      </div>
      {status === "pending" && (
        <div className="flex justify-center p-2">
          <span className="loading loading-dots loading-sm"></span>
        </div>
      )}
      {isError && (
        <div className="flex justify-center p-2">
          Failed to load conversations.
        </div>
      )}
      {data?.pages[0].data.length === 0 && (
        <div className="flex justify-center p-2">No conversations yet.</div>
      )}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {data?.pages.map((page) =>
          page.data.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedConversationId?.(chat.userId)}
              className={cn(
                "flex items-start gap-3 p-4 w-full transition-colors border-b",
                selectedConversationId === chat.userId ? "bg-primary/10 border-l-4 border-l-primary" : "hover:bg-base-200"
              )}
            >
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span>{chat.user.email[0].toUpperCase()}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold truncate text-sm">
                    {chat.user.email}
                  </span>
                  <span className="text-[10px] opacity-50">
                    {formatDistanceToNow(new Date(chat.updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-xs opacity-70 truncate">
                  {chat.lastMessage || "No messages yet"}
                </p>
              </div>
            </button>
          )),
        )}

        <div ref={observerTarget} className="h-4 w-full">
          {isFetchingNextPage && (
            <div className="flex justify-center p-2">
              <span className="loading loading-dots loading-sm"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
