import {
  TodayQuestionQuery,
  TodayQuestionQueryVariables,
} from '@/__generated__/graphql';

import type { TypedDocumentNode } from '@apollo/client/core';
import gql from 'graphql-tag';

export const INITIATE_GET_TODAY_QUESTION: TypedDocumentNode<
  TodayQuestionQuery,
  TodayQuestionQueryVariables
> = gql`
  query TodayQuestion {
    todayQuestion {
      id
      journeyId
      missionId
      day
      status
      askedAt
      conversation {
        role
        content
        createdAt
      }
    }
  }
`;
