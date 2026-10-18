import { AiChatRole } from '@/__generated__/graphql';

export interface ChatMessageData {
  id: string;
  role: AiChatRole;
  content: string;
  createdAt: string;
  status?: 'sent' | 'read';
}

export interface ChatMessageProps {
  message: ChatMessageData;
}
