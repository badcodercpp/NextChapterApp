import {
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_REFRESH_TOKEN: TypedDocumentNode<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
> = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
