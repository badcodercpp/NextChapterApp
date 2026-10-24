import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectRecentJournalEntries = createSelector(
  api.endpoints.RecentJournalEntries.select(),
  result => ({
    data: result.data?.recentJournalEntries,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
