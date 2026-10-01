import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectRecoveryScoreTrendForLastNDays = createSelector(
  api.endpoints.RecoveryScoreTrendForLastNDays.select({ days: 7 }),
  result => ({
    data:
      result.data?.recoveryScoreTrendForLastNDays?.map(e => e.score ?? 0) ?? [],
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
