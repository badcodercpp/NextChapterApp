import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';
import { defaultMoodSelectorOptions } from '@/features/CommonFeature/constants/moods';

export function getMoodEmojiByValue(
  value?: RecoveryReasonCurrentFeeling | null,
): string | undefined {
  return defaultMoodSelectorOptions.find(mood => mood.value === value)?.emoji;
}
