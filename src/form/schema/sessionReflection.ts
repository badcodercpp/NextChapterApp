import * as z from 'zod';

export const sessionReflectionSchema = z.object({
  realization: z
    .string('Realization is required')
    .min(2, 'Realization too short'),
  feeling: z.string('Feeling is required').min(2, 'Feeling too short'),
  need: z.string('Need is required').min(2, 'Need too short'),
  action: z.string('Action is required').min(2, 'Action too short'),
  userMessage: z
    .string('User Message is required')
    .min(2, 'User Message too short'),
});
