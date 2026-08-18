import {
  LogoutAllMutation,
  LogoutAllMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_LOGOUT_ALL: TypedDocumentNode<
  LogoutAllMutation,
  LogoutAllMutationVariables
> = gql`
  mutation LogoutAll {
    logoutAll
  }
`;
