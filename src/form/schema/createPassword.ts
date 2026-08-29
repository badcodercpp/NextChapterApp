import * as z from 'zod';

export const createPasswordSchema = z.object({
  password: z.string().min(6, 'Password too short'),
  confirmPassword: z.string().min(6, 'Password too short'),
});
