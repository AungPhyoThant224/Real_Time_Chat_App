"use client";
import { useSocket } from "@/hooks/socket/useSocket";
import { useSocketListener } from "@/hooks/socket/useSocketListener";
import React, { use } from "react";

const SocketInitializer = ({ children }: { children: React.ReactNode }) => {
  useSocket();
  useSocketListener();
  return <>{children}</>;
};

export default SocketInitializer;
