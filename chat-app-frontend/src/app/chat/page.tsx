import { ChatWindow } from '@/components/chat/ChatWindow'
import { Header } from '@/components/layout/Header';

const page = () => {
  return (
    <div className="h-screen flex flex-col bg-base-100">
      <Header header='User'/>
      <ChatWindow />
    </div>
  );
}

export default page