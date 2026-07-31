import { AppScreen } from '@/components/foundation/AppScreen';
import { JournalDetails } from '../../components/JournalDetails';
import React from 'react';

export const JournalDetailsScreen = () => {
  return (
    <AppScreen scroll horizontalPadding="none">
      <JournalDetails />
    </AppScreen>
  );
};
