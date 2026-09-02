import {
  RecoveryFeeling,
  RecoveryGoal,
  RecoveryReason,
  RecoveryTimeline,
} from '@/__generated__/graphql';

export type TRecoveryReason = {
  id: RecoveryReason;
  title: string;
  description: string;
  icon: any;
};

export type Timeline = {
  id: RecoveryTimeline;
  title: string;
  subtitle: string;
  icon: any;
  iconColor: string;
};

export type Feeling = {
  id: RecoveryFeeling;
  title: string;
  subtitle: string;
  emoji: string;
};

export type Goal = {
  id: RecoveryGoal;
  title: string;
  subtitle: string;
  icon: any;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: any;
};
