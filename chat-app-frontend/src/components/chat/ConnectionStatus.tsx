"use client";

import { useChatStore } from "@/store/useChatStore";
import { cn } from "@/lib/utils";
import { Wifi, WifiOff, RefreshCcw } from "lucide-react";

export const ConnectionStatus = () => {
  const { status } = useChatStore();

  return (
    <div className={cn(
      "badge gap-2 p-3 font-medium transition-all",
      status === "connected" && "badge-success text-white",
      status === "reconnecting" && "badge-warning",
      status === "disconnected" && "badge-error text-white"
    )}>
      {status === "connected" && <Wifi size={14} />}
      {status === "reconnecting" && <RefreshCcw size={14} className="animate-spin" />}
      {status === "disconnected" && <WifiOff size={14} />}
      
      <span className="capitalize">{status}</span>
    </div>
  );
};