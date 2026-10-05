import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectMoodThisWeek = createSelector(
  api.endpoints.MoodThisWeek.select(),
  result => ({
    data: result.data?.moodThisWeek,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
