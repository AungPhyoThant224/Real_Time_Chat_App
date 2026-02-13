"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { LogOut } from "lucide-react";
import { ConnectionStatus } from "../chat/ConnectionStatus";
import SocketService from "@/socket/socket";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

export const Header = ({ header, isDashboard }: { header?: string; isDashboard?: boolean }) => {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    SocketService.disconnectAndClear();
    router.push("/login");
  };

  return (
    <header className="navbar bg-base-100 border-b px-4 md:px-6 flex justify-between shrink-0">
      <div className="flex items-center gap-2">
        {isDashboard && (
          <label htmlFor="admin-drawer" className="btn btn-ghost btn-sm btn-square lg:hidden">
            <Menu size={20} />
          </label>
        )}
        <span className="font-bold text-lg tracking-tight">{header}</span>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <ConnectionStatus />
        
        <div className="hidden sm:flex items-center gap-3">
            <div className="divider divider-horizontal mx-0"></div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold">{user?.email}</span>
              <span className="text-[10px] opacity-50 uppercase">{user?.role}</span>
            </div>
        </div>

        <button onClick={handleLogout} className="btn btn-ghost btn-sm btn-square text-error">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};
