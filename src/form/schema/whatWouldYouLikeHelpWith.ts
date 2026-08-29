import * as z from 'zod';

import { GoalEnum } from '@/features/Landing/enums';

export const whatWouldYouLikeHelpWithSchema = z.array(z.enum(GoalEnum));
