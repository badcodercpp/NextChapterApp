import {
  RequestChangePasswordOtpMutation,
  RequestChangePasswordOtpMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_REQUEST_CHANGE_PASSWORD_OTP: TypedDocumentNode<
  RequestChangePasswordOtpMutation,
  RequestChangePasswordOtpMutationVariables
> = gql`
  mutation RequestChangePasswordOtp {
    requestChangePasswordOtp
  }
`;
