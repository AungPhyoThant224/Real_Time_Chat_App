"use client";

import { useEffect } from "react";
import SocketService from "@/socket/socket";
import { useChatStore } from "@/store/useChatStore";
import { useHydratedAuth } from "@/hooks/store/useHydrateAuth";

export const useSocket = () => {
  const { setStatus } = useChatStore();
  const { user, hydrated } = useHydratedAuth();

  useEffect(() => {
    if (!user || !hydrated) {
      SocketService.disconnectAndClear();
      setStatus("disconnected");
      return;
    }

    SocketService.disconnectAndClear();
    const socket = SocketService.getInstance();

    socket.connect();

    socket.on("connect", () => setStatus("connected"));
    socket.on("disconnect", () => setStatus("disconnected"));
    socket.io.on("reconnect_attempt", () => setStatus("reconnecting"));
    socket.on("connect_error", () => setStatus("reconnecting"));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("reconnect_attempt");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [user, setStatus]);
};