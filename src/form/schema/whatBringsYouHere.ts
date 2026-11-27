import * as z from 'zod';

import { RecoveryProgram } from '@/__generated__/graphql';

export const whatBringsYouHereSchema = z.enum(RecoveryProgram);
