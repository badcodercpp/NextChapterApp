import {
  Brain,
  CalendarClock,
  CalendarHeart,
  CalendarRange,
  ClockArrowDown,
  CloudRain,
  EyeOff,
  Flag,
  Heart,
  HeartCrack,
  HeartHandshake,
  HeartMinus,
  Hourglass,
  MessageCircle,
  Moon,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Sunrise,
} from 'lucide-react-native';
import { Feature, Feeling, Goal, TRecoveryReason, Timeline } from './types';
import {
  RecoveryReason,
  RecoveryReasonCurrentFeeling,
  RecoveryReasonEndGoal,
  RecoveryReasonTimeline,
} from '@/__generated__/graphql';

export const REASONS: TRecoveryReason[] = [
  {
    id: RecoveryReason.Breakup,
    title: 'Going through a breakup',
    description: 'Heal from heartbreak and move forward.',
    icon: HeartCrack,
  },
  {
    id: RecoveryReason.Divorce,
    title: 'Divorce / Separation',
    description: 'Find peace after a relationship ends.',
    icon: HeartMinus,
  },
  {
    id: RecoveryReason.Grief,
    title: 'Grief & Loss',
    description: 'Navigate loss with gentle support.',
    icon: CloudRain,
  },
  {
    id: RecoveryReason.Lonely,
    title: 'Feeling Lonely',
    description: 'Reconnect with yourself and others.',
    icon: Moon,
  },
  {
    id: RecoveryReason.Burnout,
    title: 'Burnout',
    description: 'Recharge mentally and emotionally.',
    icon: Brain,
  },
  {
    id: RecoveryReason.Growth,
    title: 'Personal Growth',
    description: 'Become the best version of yourself.',
    icon: Sparkles,
  },
];

export const TIMELINES: Timeline[] = [
  {
    id: RecoveryReasonTimeline.Today,
    title: 'Today',
    subtitle: 'It just happened',
    icon: CalendarClock,
    iconColor: 'text-primary',
  },
  {
    id: RecoveryReasonTimeline.Week,
    title: 'This week',
    subtitle: 'Within the last 7 days',
    icon: CalendarRange,
    iconColor: 'text-primary',
  },
  {
    id: RecoveryReasonTimeline.Month,
    title: 'This month',
    subtitle: 'Within the last 30 days',
    icon: CalendarHeart,
    iconColor: 'text-warning',
  },
  {
    id: RecoveryReasonTimeline.Months,
    title: 'A few months',
    subtitle: '2 to 6 months ago',
    icon: ClockArrowDown,
    iconColor: 'text-success',
  },
  {
    id: RecoveryReasonTimeline.Year,
    title: 'Over a year',
    subtitle: 'More than 12 months ago',
    icon: Hourglass,
    iconColor: 'text-info',
  },
];

export const FEELINGS: Feeling[] = [
  {
    id: RecoveryReasonCurrentFeeling.Heartbroken,
    title: 'Heartbroken',
    subtitle: 'Overwhelmed with sadness',
    emoji: '😭',
  },
  {
    id: RecoveryReasonCurrentFeeling.Sad,
    title: 'Sad',
    subtitle: 'Feeling down and low',
    emoji: '😔',
  },
  {
    id: RecoveryReasonCurrentFeeling.Angry,
    title: 'Angry',
    subtitle: 'Frustrated or irritated',
    emoji: '😡',
  },
  {
    id: RecoveryReasonCurrentFeeling.Anxious,
    title: 'Anxious',
    subtitle: 'Worried and overthinking',
    emoji: '😰',
  },
  {
    id: RecoveryReasonCurrentFeeling.Lonely,
    title: 'Lonely',
    subtitle: 'Feeling alone and empty',
    emoji: '☹️',
  },
  {
    id: RecoveryReasonCurrentFeeling.Numb,
    title: 'Numb',
    subtitle: 'Feeling empty or nothing',
    emoji: '😐',
  },
  {
    id: RecoveryReasonCurrentFeeling.Hopeful,
    title: 'Hopeful',
    subtitle: 'Positive about the future',
    emoji: '😊',
  },
  {
    id: RecoveryReasonCurrentFeeling.Grateful,
    title: 'Grateful',
    subtitle: 'Thankful and appreciative',
    emoji: '🥰',
  },
  {
    id: RecoveryReasonCurrentFeeling.Confident,
    title: 'Confident',
    subtitle: 'Feeling strong and ready',
    emoji: '🙂',
  },
];

export const GOALS: Goal[] = [
  {
    id: RecoveryReasonEndGoal.Overthinking,
    title: 'Stop overthinking',
    subtitle: 'Calm my mind and find peace',
    icon: Brain,
  },
  {
    id: RecoveryReasonEndGoal.Sleep,
    title: 'Sleep better',
    subtitle: 'Rest deeply and wake up refreshed',
    icon: Moon,
  },
  {
    id: RecoveryReasonEndGoal.Profile,
    title: 'Stop checking their profile',
    subtitle: 'Break the habit and move on',
    icon: EyeOff,
  },
  {
    id: RecoveryReasonEndGoal.Confidence,
    title: 'Build confidence',
    subtitle: 'Believe in myself again',
    icon: Shield,
  },
  {
    id: RecoveryReasonEndGoal.Heal,
    title: 'Heal emotionally',
    subtitle: 'Process my emotions and let go',
    icon: HeartHandshake,
  },
  {
    id: RecoveryReasonEndGoal.MoveOn,
    title: 'Move on',
    subtitle: 'Let go of the past and look ahead',
    icon: Flag,
  },
  {
    id: RecoveryReasonEndGoal.Motivation,
    title: 'Daily motivation',
    subtitle: 'Stay inspired and keep going',
    icon: Sunrise,
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'judgement',
    title: 'No judgement',
    description: 'You can be 100% real with me.',
    icon: MessageCircle,
  },
  {
    id: 'always',
    title: 'Always here',
    description: "Whenever you need to talk,\nI'm here for you.",
    icon: Heart,
  },
  {
    id: 'personalized',
    title: 'Personalized for you',
    description: 'I learn and grow with you to\ngive better support.',
    icon: Star,
  },
  {
    id: 'privacy',
    title: 'Your privacy matters',
    description: 'Everything you share stays\nprivate and secure.',
    icon: ShieldCheck,
  },
];
