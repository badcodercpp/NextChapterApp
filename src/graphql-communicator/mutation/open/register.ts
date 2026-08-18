import {
  RegisterMutation,
  RegisterMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_REGISTER: TypedDocumentNode<
  RegisterMutation,
  RegisterMutationVariables
> = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;
