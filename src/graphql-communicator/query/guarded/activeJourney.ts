import {
  ActiveJourneyQuery,
  ActiveJourneyQueryVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_GET_ACTIVE_JOURNEY: TypedDocumentNode<
  ActiveJourneyQuery,
  ActiveJourneyQueryVariables
> = gql`
  query ActiveJourney {
    activeJourney {
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
