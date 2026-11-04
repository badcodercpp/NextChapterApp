import * as z from 'zod';

export const todaysQuestionAnswerSchema = z.object({
  answer: z.string('Answer is required').min(2, 'Answer too short'),
});
