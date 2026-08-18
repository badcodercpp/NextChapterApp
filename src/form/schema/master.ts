import * as z from 'zod';

import { loginSchema } from '@/form/schema/login';

export const masterSchema = z.object({
  login: loginSchema,
});
