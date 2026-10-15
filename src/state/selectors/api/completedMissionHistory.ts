import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectCompletedMissionHistory = createSelector(
  api.endpoints.CompletedMissionHistory.select(),
  result => ({
    data: result.data?.completedMissionHistory,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
