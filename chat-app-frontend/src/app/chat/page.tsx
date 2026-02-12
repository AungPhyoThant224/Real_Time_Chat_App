import { ChatWindow } from '@/components/chat/ChatWindow'
import { ConnectionStatus } from '@/components/chat/ConnectionStatus'
import React from 'react'

const page = () => {
  return (
    <div className="h-screen flex flex-col bg-base-100">
      <div className="navbar bg-primary text-primary-content">
        <a className="btn btn-ghost text-xl">KBZ Support</a>
      </div>
      <ChatWindow />
    </div>
  );
}

export default page