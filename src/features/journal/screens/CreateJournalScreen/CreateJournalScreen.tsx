import { AppScreen } from '@/components/foundation/AppScreen';
import { JournalForm } from '../../components/JournalForm/JournalForm';
import React from 'react';

export const CreateJournalScreen = () => {
  return (
    <AppScreen scroll horizontalPadding="lg">
      <JournalForm />
    </AppScreen>
  );
};
