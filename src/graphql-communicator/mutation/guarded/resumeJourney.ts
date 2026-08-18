import {
  ResumeJourneyMutation,
  ResumeJourneyMutationVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_RESUME_JOURNEY: TypedDocumentNode<
  ResumeJourneyMutation,
  ResumeJourneyMutationVariables
> = gql`
  mutation ResumeJourney {
    resumeJourney {
      id
      status
      currentDay
      currentRecoveryScore
      pausedAt
      updatedAt
    }
  }
`;
