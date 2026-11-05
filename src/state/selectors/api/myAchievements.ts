import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectMyAchievements = createSelector(
  api.endpoints.MyAchievements.select(),
  result => ({
    data: result.data?.myAchievements,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
