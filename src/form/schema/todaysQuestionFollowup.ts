import * as z from 'zod';

export const todaysQuestionFollowupSchema = z.object({
  answer: z.string('Answer is required').min(2, 'Answer too short'),
});
