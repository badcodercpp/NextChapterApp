import {
  VerifyEmailOtpMutation,
  VerifyEmailOtpMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_VERIFY_EMAIL_OTP: TypedDocumentNode<
  VerifyEmailOtpMutation,
  VerifyEmailOtpMutationVariables
> = gql`
  mutation VerifyEmailOtp($input: VerifyEmailOtpInput!) {
    verifyEmailOtp(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
