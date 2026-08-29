import {
  FeelingEnum,
  GoalEnum,
  RecoveryReasonEnum,
  TimelineEnum,
} from '@/features/Landing/enums';

export type RecoveryReason = {
  id: RecoveryReasonEnum;
  title: string;
  description: string;
  icon: any;
};

export type Timeline = {
  id: TimelineEnum;
  title: string;
  subtitle: string;
  icon: any;
  iconColor: string;
};

export type Feeling = {
  id: FeelingEnum;
  title: string;
  subtitle: string;
  emoji: string;
};

export type Goal = {
  id: GoalEnum;
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
