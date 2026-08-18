import {
  ResendEmailVerificationOtpMutation,
  ResendEmailVerificationOtpMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_RESEND_EMAIL_VERIFICATION_OTP: TypedDocumentNode<
  ResendEmailVerificationOtpMutation,
  ResendEmailVerificationOtpMutationVariables
> = gql`
  mutation ResendEmailVerificationOtp($input: ResendEmailOtpInput!) {
    resendEmailVerificationOtp(input: $input)
  }
`;
