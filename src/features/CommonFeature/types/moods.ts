import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';

export interface MoodOption {
  value: RecoveryReasonCurrentFeeling;
  label: string;
  emoji: string;
}

export interface MoodSelectorProps {
  title?: string;
  subtitle?: string;
  options?: MoodOption[];
  onChange?: (value: RecoveryReasonCurrentFeeling) => void;
  collapsedCount?: number;
}
