import {
  Brain,
  CloudRain,
  HeartCrack,
  HeartMinus,
  Moon,
  Sparkles,
} from 'lucide-react-native';

import { RecoveryReason } from './types';

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
