import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const lazySelectMissionHistory = (journeyId: string) => {
  return createSelector(
    api.endpoints.MissionHistory.select({
      journeyId,
    }),
    result => ({
      data: result.data?.missionHistory,
      loading: result.isLoading,
      isError: result.isError,
      error: result.error,
    }),
  );
};
