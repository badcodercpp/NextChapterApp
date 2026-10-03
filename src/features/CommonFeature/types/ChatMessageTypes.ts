export interface ChatMessageData {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  createdAt: string;
  status?: 'sent' | 'read';
}

export interface ChatMessageProps {
  message: ChatMessageData;
}
