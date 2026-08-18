import {
  FollowUpMutation,
  FollowUpMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_FOLLOW_UP: TypedDocumentNode<
  FollowUpMutation,
  FollowUpMutationVariables
> = gql`
  mutation FollowUp($input: FollowUpInput!) {
    followUp(input: $input) {
      id
      status
      conversation {
        role
        content
        reflection
        insight
        question
        summary
        createdAt
      }
    }
  }
`;
