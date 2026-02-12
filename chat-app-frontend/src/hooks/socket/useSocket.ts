"use client";

import { useEffect } from "react";
import SocketService from "@/socket/socket";
import { useChatStore } from "@/store/useChatStore";
import { useHydratedAuth } from "@/hooks/store/useHydrateAuth";

export const useSocket = () => {
  const { setStatus } = useChatStore();
  const { user, hydrated } = useHydratedAuth();
  const socket = SocketService.getInstance();

  useEffect(() => {
    console.log("Use Socket");
    
    if (!user || !hydrated) {
      socket.disconnect();
      return;
    }

    socket.connect();

    socket.on("connect", () => setStatus("connected"));
    socket.on("disconnect", () => setStatus("disconnected"));
    socket.io.on("reconnect_attempt", () => setStatus("reconnecting"));
    socket.on("connect_error", () => setStatus("disconnected"));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("reconnect_attempt");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [user, socket, setStatus]);

  return socket;
};