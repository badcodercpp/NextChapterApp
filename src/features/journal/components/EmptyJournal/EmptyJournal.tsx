import { AppButton } from '@/components/foundation/AppButton';
import { AppEmptyState } from '@/components/foundation/AppEmptyState';
import { EmptyJournalProps } from './types';
import { OpenBookIllustration } from '@/assets/illustrations';
import { Plus } from 'lucide-react-native';
import React from 'react';

export function EmptyJournal({ onCreatePress }: EmptyJournalProps) {
  return (
    <AppEmptyState
      image={<OpenBookIllustration />}
      title="No journals yet"
      description="Capture your thoughts, memories, and reflections to begin your mindfulness journey."
      action={
        <AppButton
          title="Create Journal"
          leftIcon={Plus}
          onPress={onCreatePress}
        />
      }
    />
  );
}
