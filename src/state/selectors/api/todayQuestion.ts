import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectTodayQuestion = createSelector(
  api.endpoints.TodayQuestion.select(),
  result => ({
    data: result.data?.todayQuestion,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
