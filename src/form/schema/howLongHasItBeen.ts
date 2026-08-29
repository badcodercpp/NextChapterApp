import * as z from 'zod';

import { TimelineEnum } from '@/features/Landing/enums';

export const howLongHasItBeenSchema = z.enum(TimelineEnum);
