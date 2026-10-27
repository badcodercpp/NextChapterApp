import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectActiveDailySession = createSelector(
  api.endpoints.ActiveDailySession.select(),
  result => ({
    data: result.data?.activeDailySession,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
