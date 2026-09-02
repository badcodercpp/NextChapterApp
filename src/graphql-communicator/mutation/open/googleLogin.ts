import {
  GoogleLoginMutation,
  GoogleLoginMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_GOOGLE_LOGIN: TypedDocumentNode<
  GoogleLoginMutation,
  GoogleLoginMutationVariables
> = gql`
  mutation GoogleLogin($input: GoogleLoginInput!) {
    googleLogin(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
