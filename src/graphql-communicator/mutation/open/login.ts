import { LoginMutation, LoginMutationVariables } from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_LOGIN: TypedDocumentNode<
  LoginMutation,
  LoginMutationVariables
> = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
