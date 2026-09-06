import * as z from 'zod';

import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';

export const howAreYouFeelingSchema = z.array(
  z.enum(RecoveryReasonCurrentFeeling),
);
