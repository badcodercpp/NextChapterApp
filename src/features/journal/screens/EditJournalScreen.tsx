import { AppAuthenticatedLayout, AppButton } from '@/components';
import { ChevronRight, Save } from 'lucide-react-native';
import { CreateJournalForm, JournalHeader } from '../components';
import { usePreventBackNavigation, useScreenHeader } from '@/navigation/hooks';

import { MoodSelector } from '@/features/CommonFeature';
import React from 'react';
import { View } from 'react-native';
import { useEditJournalBootstrap } from '../hooks/useEditJournalBootstrap';

export function EditJournalScreen() {
  const { value, setValue, editJournal, editingJournal } =
    useEditJournalBootstrap();

  useScreenHeader({
    title: '',
    backDisabled: editingJournal,
  });

  usePreventBackNavigation(editingJournal);

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-2">
        <JournalHeader onSearchPress={() => {}} />
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
        <CreateJournalForm />
      </View>
      <View className="mt-4">
        <AppButton
          title="Update Journal"
          size="lg"
          leftIcon={Save}
          fullWidth
          className="mb-0"
          onPress={editJournal}
          rightIcon={ChevronRight}
          loading={editingJournal}
          disabled={editingJournal}
        />
      </View>
    </AppAuthenticatedLayout>
  );
}
