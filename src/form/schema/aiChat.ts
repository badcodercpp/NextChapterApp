import * as z from 'zod';

export const aiChatSchema = z.object({
  message: z.string('Message is required').min(2, 'Message too short'),
});
