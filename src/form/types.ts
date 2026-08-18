import * as z from 'zod';

import { loginSchema } from '@/form';
import { masterSchema } from '@/form';

export type LoginFormData = z.infer<typeof loginSchema>;

export type MasterFormData = z.infer<typeof masterSchema>;
