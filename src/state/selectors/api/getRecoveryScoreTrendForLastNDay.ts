import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const lazySelectGetRecoveryScoreTrendForLastNDay = (days: number) => {
  return createSelector(
    api.endpoints.GetRecoveryScoreTrendForLastNDay.select({ days }),
    result => ({
      data: result.data?.getRecoveryScoreTrendForLastNDay ?? [],
      loading: result.isLoading,
      isError: result.isError,
      error: result.error,
    }),
  );
};
