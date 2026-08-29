import * as z from 'zod';

import { RecoveryReasonEnum } from '@/features/Landing/enums';

export const whatBringsYouHereSchema = z.enum(RecoveryReasonEnum);
