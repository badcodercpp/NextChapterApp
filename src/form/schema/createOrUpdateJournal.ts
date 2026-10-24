import * as z from 'zod';

export const createOrUpdateJournalSchema = z.object({
  title: z.string('Title is required').min(2, 'Title too short'),
  content: z.string('Content is required').min(2, 'Content too short'),
});
