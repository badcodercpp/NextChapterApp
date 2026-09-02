import * as z from 'zod';

import { RecoveryGoal } from '@/__generated__/graphql';

export const whatWouldYouLikeHelpWithSchema = z.array(z.enum(RecoveryGoal));
