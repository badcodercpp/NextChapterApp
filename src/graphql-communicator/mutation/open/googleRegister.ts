import {
  GoogleRegisterMutation,
  GoogleRegisterMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_GOOGLE_REGISTER: TypedDocumentNode<
  GoogleRegisterMutation,
  GoogleRegisterMutationVariables
> = gql`
  mutation GoogleRegister($input: GoogleRegisterInput!) {
    googleRegister(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
