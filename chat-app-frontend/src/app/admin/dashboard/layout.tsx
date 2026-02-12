import ConversationList from "@/components/chat/ConversationList";
import React from "react";
import { Header } from "@/components/layout/Header";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open h-screen">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col h-full overflow-hidden">
        <Header isDashboard />
        <main className="flex-1 flex flex-col relative overflow-hidden bg-base-200">
          {children}
        </main>
      </div>

      <div className="drawer-side z-[100]">
        <label
          htmlFor="admin-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="w-80 h-full bg-base-100 border-r border-base-300">
          <ConversationList />
        </aside>
      </div>
    </div>
  );
};

export default AdminLayout;
