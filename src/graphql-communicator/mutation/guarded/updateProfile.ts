import {
  UpdateProfileMutation,
  UpdateProfileMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_UPDATE_PROFILE: TypedDocumentNode<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
> = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
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
