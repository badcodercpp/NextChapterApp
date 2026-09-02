import * as z from 'zod';

import { RecoveryTimeline } from '@/__generated__/graphql';

export const howLongHasItBeenSchema = z.enum(RecoveryTimeline);
