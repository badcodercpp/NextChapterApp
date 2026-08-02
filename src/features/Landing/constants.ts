import {
  Brain,
  CalendarClock,
  CalendarHeart,
  CalendarRange,
  ClockArrowDown,
  CloudRain,
  HeartCrack,
  HeartMinus,
  Hourglass,
  Moon,
  Sparkles,
} from 'lucide-react-native';
import { RecoveryReason, Timeline } from './types';

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
