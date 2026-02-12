"use client";

import { useEffect } from "react";
import SocketService from "@/socket/socket";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

export const useSocket = () => {
  const { setStatus } = useChatStore();
  const { user } = useAuthStore();
  const socket = SocketService.getInstance();

  useEffect(() => {
    if (!user) return;

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