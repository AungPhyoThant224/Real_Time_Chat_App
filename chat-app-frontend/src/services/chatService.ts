import APIClient from "./api-client";
import { Conversation, Message, PaginatedResponse } from "@/types";

export const conversationService = new APIClient<
  PaginatedResponse<Conversation>
>("/conversations");

export const messageService = new APIClient<PaginatedResponse<Message>>(
  "/messages/history",
);
