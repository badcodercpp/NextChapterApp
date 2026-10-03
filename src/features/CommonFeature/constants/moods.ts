import { MoodOption } from '../types/moods';
import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';

export const defaultMoodSelectorOptions: MoodOption[] = [
  {
    value: RecoveryReasonCurrentFeeling.Heartbroken,
    label: 'Heartbroken',
    emoji: '💔',
  },
  {
    value: RecoveryReasonCurrentFeeling.Sad,
    label: 'Sad',
    emoji: '😞',
  },
  {
    value: RecoveryReasonCurrentFeeling.Angry,
    label: 'Angry',
    emoji: '😠',
  },
  {
    value: RecoveryReasonCurrentFeeling.Anxious,
    label: 'Anxious',
    emoji: '😟',
  },
  {
    value: RecoveryReasonCurrentFeeling.Lonely,
    label: 'Lonely',
    emoji: '🥺',
  },
  {
    value: RecoveryReasonCurrentFeeling.Numb,
    label: 'Numb',
    emoji: '😐',
  },
  {
    value: RecoveryReasonCurrentFeeling.Hopeful,
    label: 'Hopeful',
    emoji: '🙂',
  },
  {
    value: RecoveryReasonCurrentFeeling.Grateful,
    label: 'Grateful',
    emoji: '😊',
  },
  {
    value: RecoveryReasonCurrentFeeling.Confident,
    label: 'Confident',
    emoji: '😌',
  },
];
