import { MeQuery, MeQueryVariables } from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_GET_ME: TypedDocumentNode<
  MeQuery,
  MeQueryVariables
> = gql`
  query Me {
    me {
      id
      email
      displayName
      gender
      avatarUrl
      timezone
      locale
      emailVerified
      isActive
      createdAt
      updatedAt
    }
  }
`;
