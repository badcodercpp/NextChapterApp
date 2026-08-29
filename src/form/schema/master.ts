import * as z from 'zod';

import { createAccountSchema } from '@/form/schema/createAccount';
import { createPasswordSchema } from '@/form/schema/createPassword';
import { forgotPasswordSchema } from '@/form/schema/forgotPassword';
import { howAreYouFeelingSchema } from '@/form/schema/howAreYouFeeling';
import { howLongHasItBeenSchema } from '@/form/schema/howLongHasItBeen';
import { loginSchema } from '@/form/schema/login';
import { verifyEmailSchema } from '@/form/schema/verifyEmail';
import { verifyIdentitySchema } from '@/form/schema/verifyIdentity';
import { whatBringsYouHereSchema } from '@/form/schema/whatBringsYouHere';
import { whatWouldYouLikeHelpWithSchema } from '@/form/schema/whatWouldYouLikeHelpWith';

export const masterSchema = z.object({
  login: loginSchema,
  whatBringsYouHere: whatBringsYouHereSchema,
  howLongHasItBeen: howLongHasItBeenSchema,
  howAreYouFeeling: howAreYouFeelingSchema,
  whatWouldYouLikeHelpWith: whatWouldYouLikeHelpWithSchema,
  createAccount: createAccountSchema,
  createPassword: createPasswordSchema,
  verifyEmail: verifyEmailSchema,
  forgotPassword: forgotPasswordSchema,
  verifyIdentity: verifyIdentitySchema,
});
