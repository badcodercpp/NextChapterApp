import * as z from 'zod';

import { RecoveryFeeling } from '@/__generated__/graphql';

export const howAreYouFeelingSchema = z.array(z.enum(RecoveryFeeling));
