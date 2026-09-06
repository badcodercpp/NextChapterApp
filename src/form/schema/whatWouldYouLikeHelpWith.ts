import * as z from 'zod';

import { RecoveryReasonEndGoal } from '@/__generated__/graphql';

export const whatWouldYouLikeHelpWithSchema = z.array(
  z.enum(RecoveryReasonEndGoal),
);
