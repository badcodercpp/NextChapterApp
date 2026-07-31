import { JournalCategory } from '../types';
import { UserMood } from '@/constants';
import { z } from 'zod';

export const journalSchema = z
  .object({
    mood: z.nativeEnum(UserMood).optional(),

    category: z.nativeEnum(JournalCategory).optional(),

    title: z
      .string()
      .trim()
      .min(1, 'Title is required')
      .max(80, 'Maximum 80 characters'),

    content: z
      .string()
      .trim()
      .min(1, 'Journal is required')
      .max(2000, 'Maximum 2000 characters'),
  })
  .refine(data => data.mood !== undefined, {
    path: ['mood'],
    message: 'Please select a mood',
  })
  .refine(data => data.category !== undefined, {
    path: ['category'],
    message: 'Please select a category',
  });

export type JournalFormValues = z.infer<typeof journalSchema>;
