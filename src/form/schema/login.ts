import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(6, 'Password too short'),
});
