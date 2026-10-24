import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectMyJournalEntries = createSelector(
  api.endpoints.MyJournalEntries.select(),
  result => ({
    data: result.data?.myJournalEntries,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
