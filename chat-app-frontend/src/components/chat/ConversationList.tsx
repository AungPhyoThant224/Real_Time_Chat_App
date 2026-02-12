"use client";
import { useConversation } from "@/hooks/query/useConversationQuery";
import { useConversationSync } from "@/hooks/query/useConversationSync";
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

  const handleSelect = (userId: number) => {
    setSelectedConversationId?.(userId);

    const drawerCheckbox = document.getElementById(
      "admin-drawer",
    ) as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="flex flex-col h-full bg-base-100 border-r border-base-300 w-full lg:w-80">
      <div className="p-4 flex items-center justify-between border-b border-base-300 bg-base-100/50 backdrop-blur-md sticky top-0 z-10">
        <h1 className="font-bold text-xl tracking-tight">Messages</h1>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-base-200/20">
        {status === "pending" && (
          <div className="flex flex-col items-center gap-2 p-8 text-base-content/50">
            <span className="loading loading-spinner loading-md"></span>
            <p className="text-xs font-medium">Loading chats...</p>
          </div>
        )}

        {data?.pages.map((page) =>
          page.data.map((chat) => {
            const isActive = selectedConversationId === chat.userId;
            return (
              <button
                key={chat.id}
                onClick={() => handleSelect(chat.userId)}
                className={cn(
                  "group relative flex items-center gap-4 p-4 w-full transition-all border-b border-base-300/50",
                  isActive 
                    ? "bg-primary text-primary-content" 
                    : "hover:bg-base-300/50 bg-base-100"
                )}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                )}

                <div className="avatar placeholder ring-offset-base-100 ring-offset-2">
                  <div className={cn(
                    "rounded-full w-12 transition-transform group-hover:scale-105",
                    isActive ? "bg-white text-primary" : "bg-neutral text-neutral-content"
                  )}>
                    <span className="text-lg font-bold flex items-center justify-center h-[100%]">{chat.user.email[0].toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn(
                      "font-bold truncate text-sm",
                      isActive ? "text-white" : "text-base-content"
                    )}>
                      {chat.user.email.split('@')[0]}
                    </span>
                    <span className={cn(
                      "text-[10px] whitespace-nowrap opacity-70",
                      isActive ? "text-primary-content/80" : "text-base-content/60"
                    )}>
                      {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: false })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "text-xs truncate max-w-[140px]",
                      isActive ? "text-primary-content/90" : "text-base-content/70"
                    )}>
                      {chat.lastMessage || "Start a conversation..."}
                    </p>
                  </div>
                </div>
              </button>
            );
          }),
        )}

        <div ref={observerTarget} className="h-10 w-full flex items-center justify-center p-4">
          {isFetchingNextPage && <span className="loading loading-dots loading-sm opacity-50"></span>}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
