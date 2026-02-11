import { create } from 'zustand';

type ConnectionStatus = 'connected' | 'reconnecting' | 'disconnected';

interface ChatState {
  status: ConnectionStatus;
  setStatus: (status: ConnectionStatus) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  status: 'disconnected',
  setStatus: (status) => set({ status }),
}));