import * as z from 'zod';

import { RecoveryReason } from '@/__generated__/graphql';

export const whatBringsYouHereSchema = z.enum(RecoveryReason);
