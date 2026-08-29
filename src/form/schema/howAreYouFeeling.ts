import * as z from 'zod';

import { FeelingEnum } from '@/features/Landing/enums';

export const howAreYouFeelingSchema = z.array(z.enum(FeelingEnum));
