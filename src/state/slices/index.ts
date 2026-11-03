import authtokenSlice from '@/state/slices/local/authtoken';
import { combineSlices } from '@reduxjs/toolkit';
import editJournalTargetSlice from '@/state/slices/local/editJournalTarget';
import preferencesSlice from '@/state/slices/local/preferences';

export const getCombinedSlices = () => {
  return combineSlices(
    // local state
    authtokenSlice,
    editJournalTargetSlice,
    preferencesSlice,
  );
};
