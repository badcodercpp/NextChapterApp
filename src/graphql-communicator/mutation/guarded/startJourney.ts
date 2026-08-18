import {
  StartJourneyMutation,
  StartJourneyMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_START_JOURNEY: TypedDocumentNode<
  StartJourneyMutation,
  StartJourneyMutationVariables
> = gql`
  mutation StartJourney($input: StartJourneyInput!) {
    startJourney(input: $input) {
      id
      userId
      program
      status
      currentDay
      currentRecoveryScore
      startedAt
      pausedAt
      completedAt
      createdAt
      updatedAt
    }
  }
`;
