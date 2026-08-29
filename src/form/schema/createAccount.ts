import * as z from 'zod';

export const createAccountSchema = z.object({
  email: z.email('Invalid email'),
  fullName: z.string('Name is required').min(2, 'Name too short'),
});
