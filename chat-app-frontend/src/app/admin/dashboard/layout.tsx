import ConversationList from '@/components/chat/ConversationList';
import React from 'react'

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex h-screen bg-base-200">
      <ConversationList />
      <main className="flex-1 flex flex-col relative">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout