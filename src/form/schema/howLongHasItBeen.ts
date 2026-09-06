import * as z from 'zod';

import { RecoveryReasonTimeline } from '@/__generated__/graphql';

export const howLongHasItBeenSchema = z.enum(RecoveryReasonTimeline);
