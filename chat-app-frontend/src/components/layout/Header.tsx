"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, ShieldCheck } from "lucide-react";
import { ConnectionStatus } from "../chat/ConnectionStatus";
import SocketService from "@/socket/socket";
import { useRouter } from "next/navigation";

export const Header = ({header}:{header?: string}) => {
  const { logout, user } = useAuthStore();
  const router = useRouter();

    const handleLogout = () => {
        logout();
        SocketService.getInstance().disconnect();
        router.push("/login");
    }

  return (
    <header className="navbar bg-base-100 border-b px-6 flex justify-between">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg tracking-tight">{header}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <ConnectionStatus />
        <div className="divider divider-horizontal mx-0"></div>
        <div className="flex flex-col items-end mr-2">
          <span className="text-xs font-bold">{user?.email}</span>
          <span className="text-[10px] opacity-50 uppercase">{user?.role}</span>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost btn-sm btn-square text-error">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};