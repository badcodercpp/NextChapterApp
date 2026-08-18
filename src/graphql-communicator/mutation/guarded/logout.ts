import {
  LogoutMutation,
  LogoutMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_LOGOUT: TypedDocumentNode<
  LogoutMutation,
  LogoutMutationVariables
> = gql`
  mutation Logout {
    logout
  }
`;
