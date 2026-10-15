import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectTodayMission = createSelector(
  api.endpoints.TodayMission.select(),
  result => ({
    data: result.data?.todayMission,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
