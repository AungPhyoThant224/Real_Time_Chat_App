'use client';
import { useSocket } from "@/hooks/socket/useSocket";
import React, { use } from "react";

const SocketInitializer = ({ children }: { children: React.ReactNode }) => {
    useSocket();
    return <>{children}</>;
};

export default SocketInitializer;
