import { AppAuthenticatedLayout, AppButton } from '@/components';
import { ChevronRight, Save } from 'lucide-react-native';
import {
  CreateJournalForm,
  JournalEmptyCard,
  JournalEntries,
  JournalHeader,
  JournalPromptCard,
} from '../components';
import { usePreventBackNavigation, useScreenHeader } from '@/navigation/hooks';

import { JournalRoutes } from '@/features/journal/navigation';
import { MoodSelector } from '@/features/CommonFeature';
import React from 'react';
import { View } from 'react-native';
import { useJournalBootstrap } from '../hooks/useJournalBootstrap';

export function JournalScreen() {
  const { value, setValue, createJournal, creatingJournal } =
    useJournalBootstrap();

  useScreenHeader({
    title: '',
    backDisabled: creatingJournal,
  });

  usePreventBackNavigation(creatingJournal);

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-2">
        <JournalHeader onSearchPress={() => {}} />
      </View>
      <View className="mt-4">
        <JournalEmptyCard />
      </View>
      <View className="mt-4">
        <MoodSelector
          value={value}
          setValue={setValue}
          title="Your current mood"
          subtitle="How are you feeling now ?"
          selectionMode="single"
        />
      </View>
      <View className="mt-4">
        <JournalPromptCard />
      </View>
      <View className="mt-4">
        <CreateJournalForm />
      </View>
      <View className="mt-4">
        <AppButton
          title="Save Journal"
          size="lg"
          leftIcon={Save}
          fullWidth
          className="mb-0"
          onPress={createJournal}
          rightIcon={ChevronRight}
          loading={creatingJournal}
          disabled={creatingJournal}
        />
      </View>
      <View>
        <JournalEntries origin={JournalRoutes.CreateJournal} />
      </View>
    </AppAuthenticatedLayout>
  );
}
