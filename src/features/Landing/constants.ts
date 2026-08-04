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
import { Feature, Feeling, Goal, RecoveryReason, Timeline } from './types';

export const REASONS: RecoveryReason[] = [
  {
    id: 'breakup',
    title: 'Going through a breakup',
    description: 'Heal from heartbreak and move forward.',
    icon: HeartCrack,
  },
  {
    id: 'divorce',
    title: 'Divorce / Separation',
    description: 'Find peace after a relationship ends.',
    icon: HeartMinus,
  },
  {
    id: 'grief',
    title: 'Grief & Loss',
    description: 'Navigate loss with gentle support.',
    icon: CloudRain,
  },
  {
    id: 'lonely',
    title: 'Feeling Lonely',
    description: 'Reconnect with yourself and others.',
    icon: Moon,
  },
  {
    id: 'burnout',
    title: 'Burnout',
    description: 'Recharge mentally and emotionally.',
    icon: Brain,
  },
  {
    id: 'growth',
    title: 'Personal Growth',
    description: 'Become the best version of yourself.',
    icon: Sparkles,
  },
];

export const TIMELINES: Timeline[] = [
  {
    id: 'today',
    title: 'Today',
    subtitle: 'It just happened',
    icon: CalendarClock,
    iconColor: 'text-primary',
  },
  {
    id: 'week',
    title: 'This week',
    subtitle: 'Within the last 7 days',
    icon: CalendarRange,
    iconColor: 'text-primary',
  },
  {
    id: 'month',
    title: 'This month',
    subtitle: 'Within the last 30 days',
    icon: CalendarHeart,
    iconColor: 'text-warning',
  },
  {
    id: 'months',
    title: 'A few months',
    subtitle: '2 to 6 months ago',
    icon: ClockArrowDown,
    iconColor: 'text-success',
  },
  {
    id: 'year',
    title: 'Over a year',
    subtitle: 'More than 12 months ago',
    icon: Hourglass,
    iconColor: 'text-info',
  },
];

export const FEELINGS: Feeling[] = [
  {
    id: 'heartbroken',
    title: 'Heartbroken',
    subtitle: 'Overwhelmed with sadness',
    emoji: '😭',
  },
  {
    id: 'sad',
    title: 'Sad',
    subtitle: 'Feeling down and low',
    emoji: '😔',
  },
  {
    id: 'angry',
    title: 'Angry',
    subtitle: 'Frustrated or irritated',
    emoji: '😡',
  },
  {
    id: 'anxious',
    title: 'Anxious',
    subtitle: 'Worried and overthinking',
    emoji: '😰',
  },
  {
    id: 'lonely',
    title: 'Lonely',
    subtitle: 'Feeling alone and empty',
    emoji: '☹️',
  },
  {
    id: 'numb',
    title: 'Numb',
    subtitle: 'Feeling empty or nothing',
    emoji: '😐',
  },
  {
    id: 'hopeful',
    title: 'Hopeful',
    subtitle: 'Positive about the future',
    emoji: '😊',
  },
  {
    id: 'grateful',
    title: 'Grateful',
    subtitle: 'Thankful and appreciative',
    emoji: '🥰',
  },
  {
    id: 'confident',
    title: 'Confident',
    subtitle: 'Feeling strong and ready',
    emoji: '🙂',
  },
];

export const GOALS: Goal[] = [
  {
    id: 'overthinking',
    title: 'Stop overthinking',
    subtitle: 'Calm my mind and find peace',
    icon: Brain,
  },
  {
    id: 'sleep',
    title: 'Sleep better',
    subtitle: 'Rest deeply and wake up refreshed',
    icon: Moon,
  },
  {
    id: 'profile',
    title: 'Stop checking their profile',
    subtitle: 'Break the habit and move on',
    icon: EyeOff,
  },
  {
    id: 'confidence',
    title: 'Build confidence',
    subtitle: 'Believe in myself again',
    icon: Shield,
  },
  {
    id: 'heal',
    title: 'Heal emotionally',
    subtitle: 'Process my emotions and let go',
    icon: HeartHandshake,
  },
  {
    id: 'move-on',
    title: 'Move on',
    subtitle: 'Let go of the past and look ahead',
    icon: Flag,
  },
  {
    id: 'motivation',
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
