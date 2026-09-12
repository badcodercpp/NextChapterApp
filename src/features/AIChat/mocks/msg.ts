import { ChatMessageData } from '@/features/AIChat/components/ChatMessage';

export const MESSAGES_MOCK: ChatMessageData[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hey Ajay, how are you feeling today? You've made it through another day — that's something to be proud of. 🌱",
    createdAt: '9:30 AM',
  },
  {
    id: '2',
    role: 'user',
    content: "I'm feeling a bit overwhelmed today.\nToo many thoughts.",
    createdAt: '9:31 AM',
    status: 'read',
  },
  {
    id: '3',
    role: 'assistant',
    content:
      "I hear you. Overthinking can be really tiring. Want to talk about what's on your mind?",
    createdAt: '9:31 AM',
  },
  {
    id: '4',
    role: 'user',
    content: "It's mostly about my past relationship. I miss her sometimes.",
    createdAt: '9:32 AM',
    status: 'read',
  },
  {
    id: '5',
    role: 'assistant',
    content:
      "It's completely normal to miss someone who was once so important to you. Grief takes time. Would it help if we explore what you're missing the most?",
    createdAt: '9:33 AM',
  },
];
