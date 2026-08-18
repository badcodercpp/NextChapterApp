import {
  PauseJourneyMutation,
  PauseJourneyMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_PAUSE_JOURNEY: TypedDocumentNode<
  PauseJourneyMutation,
  PauseJourneyMutationVariables
> = gql`
  mutation PauseJourney {
    pauseJourney {
      id
      status
      currentDay
      currentRecoveryScore
      pausedAt
      updatedAt
    }
  }
`;
