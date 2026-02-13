export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: number;
  email: string;
  role: Role;
}

export interface AuthResponse {
  id: number;
  token: string;
  email: string;
  role: Role;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  sender?: Partial<User>;
}

export interface Conversation {
  id: number;
  userId: number;
  lastMessage: string;
  updatedAt: string;
  user: User;
}

export interface Response<T> {
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  meta: {
    currentPage: number;
    limit: number;
    total?: number;
    hasMore: boolean;
    lastMessageId?: number;
    nextCursor: number | undefined; 
  };
}