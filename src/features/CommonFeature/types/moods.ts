import { Dispatch, SetStateAction } from 'react';

import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';

export interface MoodOption {
  value: RecoveryReasonCurrentFeeling;
  label: string;
  emoji: string;
}

export type MoodSelectionMode = 'single' | 'multiple';

export interface MoodSelectorProps {
  title?: string;
  subtitle?: string;
  options?: MoodOption[];
  onChange?: (value: RecoveryReasonCurrentFeeling) => void;
  collapsedCount?: number;
  value: (RecoveryReasonCurrentFeeling | undefined)[];
  setValue: Dispatch<
    SetStateAction<(RecoveryReasonCurrentFeeling | undefined)[]>
  >;
  selectionMode?: MoodSelectionMode;
}
