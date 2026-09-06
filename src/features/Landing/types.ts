import {
  RecoveryReason,
  RecoveryReasonCurrentFeeling,
  RecoveryReasonEndGoal,
  RecoveryReasonTimeline,
} from '@/__generated__/graphql';

export type TRecoveryReason = {
  id: RecoveryReason;
  title: string;
  description: string;
  icon: any;
};

export type Timeline = {
  id: RecoveryReasonTimeline;
  title: string;
  subtitle: string;
  icon: any;
  iconColor: string;
};

export type Feeling = {
  id: RecoveryReasonCurrentFeeling;
  title: string;
  subtitle: string;
  emoji: string;
};

export type Goal = {
  id: RecoveryReasonEndGoal;
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
