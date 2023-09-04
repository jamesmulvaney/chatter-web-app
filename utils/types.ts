import { ChatSession, Messages, User } from "@prisma/client";

type CSessions = {
  id: string;
  users?: User[] | null;
  createdAt: Date;
};

export type MessagesWithAuthor = Messages & {
  author: User;
};

export type GetChatSessionsResponse = {
  chatSessions?: CSessions[];
  success: boolean;
};

export type GetChatSessionResponse = {
  chatSession?: ChatSession & {
    users: User[];
    messages: Messages[];
  };
  success: boolean;
};

export type GetChatMessagesResponse = {
  messages?: MessagesWithAuthor[];
  success: boolean;
};

export type ChatSessionFull = {
  id: string;
  createdAt: string;
  users: User[];
  messages: Messages[];
};

export type NewChatSessionRes = {
  chatSessionId?: string;
  error?: {
    field: string;
    reason: string;
  };
};
