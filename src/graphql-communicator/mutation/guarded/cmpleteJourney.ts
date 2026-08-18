import {
  CompleteJourneyMutation,
  CompleteJourneyMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_COMPLETE_JOURNEY: TypedDocumentNode<
  CompleteJourneyMutation,
  CompleteJourneyMutationVariables
> = gql`
  mutation CompleteJourney {
    completeJourney {
      id
      status
      currentDay
      currentRecoveryScore
      completedAt
      updatedAt
    }
  }
`;
