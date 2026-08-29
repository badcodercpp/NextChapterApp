import * as z from 'zod';

export const verifyEmailSchema = z.object({
  otp: z.array(
    z.string('otp field is required').min(1, 'otp field is required'),
  ),
});
