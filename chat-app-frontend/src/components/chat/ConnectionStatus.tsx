"use client";

import { useChatStore } from "@/store/useChatStore";
import { cn } from "@/lib/utils";
import { Wifi, WifiOff, RefreshCcw } from "lucide-react";

export const ConnectionStatus = () => {
  const { status } = useChatStore();

  const config = {
    connected: { label: "Connected", icon: <Wifi size={14} />, class: "badge-success text-white" },
    reconnecting: { label: "Reconnecting...", icon: <RefreshCcw size={14} className="animate-spin" />, class: "badge-warning" },
    disconnected: { label: "Offline", icon: <WifiOff size={14} />, class: "badge-error text-white" },
  };

  const current = config[status] || config.disconnected;

  return (
    <div className={cn("badge gap-2 p-3 font-medium transition-all duration-300 shadow-sm", current.class)}>
      {current.icon}
      <span className="text-[10px] uppercase tracking-wider">{current.label}</span>
    </div>
  );
};