import {
  VerifyChangePasswordOtpMutation,
  VerifyChangePasswordOtpMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_VERIFY_CHANGE_PASSWORD_OTP: TypedDocumentNode<
  VerifyChangePasswordOtpMutation,
  VerifyChangePasswordOtpMutationVariables
> = gql`
  mutation VerifyChangePasswordOtp($input: VerifyChangePasswordOtpInput!) {
    verifyChangePasswordOtp(input: $input)
  }
`;
