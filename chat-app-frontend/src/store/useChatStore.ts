import { create } from 'zustand';

type ConnectionStatus = 'connected' | 'reconnecting' | 'disconnected';

interface ChatState {
  status: ConnectionStatus;
  setStatus: (status: ConnectionStatus) => void;
  selectedConversationId?: number;
  setSelectedConversationId?: (id: number) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  status: 'disconnected',
  selectedConversationId: undefined,
  setStatus: (status) => set({ status }),
  setSelectedConversationId: (id) => set({ selectedConversationId: id }),
}));