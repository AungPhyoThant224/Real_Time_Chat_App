'use client';
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ConnectionStatus } from "@/components/chat/ConnectionStatus";
import SocketService from "@/socket/socket";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
    const router = useRouter();
    const handleLogout = () => {
        useAuthStore.getState().logout();
        SocketService.getInstance().disconnect();
        router.push("/login");
    }
  return (
    <>
      {/* <ConnectionStatus />
      <button onClick={handleLogout}>Logout</button> */}
      <ChatWindow />
    </>
  );
};

export default page;
