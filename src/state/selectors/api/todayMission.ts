import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const lazySelectTodayMission = (journeyId: string, day: number) => {
  return createSelector(
    api.endpoints.TodayMission.select({
      journeyId,
      day,
    }),
    result => ({
      data: result.data?.todayMission,
      loading: result.isLoading,
      isError: result.isError,
      error: result.error,
    }),
  );
};
