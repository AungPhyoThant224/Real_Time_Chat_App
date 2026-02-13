import { create } from 'zustand';

type ConnectionStatus = 'connected' | 'reconnecting' | 'disconnected';

interface ChatState {
  status: ConnectionStatus;
  setStatus: (status: ConnectionStatus) => void;
  selectedConversationId: number|null;
  setSelectedConversationId?: (id: number) => void;
  scrollStatus: {status:boolean, id:number|null};
  setScrollStatus: (status:boolean, id: number|null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  status: 'disconnected',
  selectedConversationId: null,
  scrollStatus: {status: false, id: null},
  setStatus: (status) => set({ status }),
  setSelectedConversationId: (id) => set({ selectedConversationId: id }),
  setScrollStatus(status, id) {
    set({scrollStatus: {status, id}})
  },
}));