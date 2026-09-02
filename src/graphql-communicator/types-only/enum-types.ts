import gql from 'graphql-tag';

export const getRecoveryReason = gql`
  query GetRecoveryReason {
    getRecoveryReason
  }
`;

export const getRecoveryTimeline = gql`
  query GetRecoveryTimeline {
    getRecoveryTimeline
  }
`;

export const getRecoveryFeeling = gql`
  query GetRecoveryFeeling {
    getRecoveryFeeling
  }
`;

export const getRecoveryGoal = gql`
  query GetRecoveryGoal {
    getRecoveryGoal
  }
`;
