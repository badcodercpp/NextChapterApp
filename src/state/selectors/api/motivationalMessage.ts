import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectMotivationalMessage = createSelector(
  api.endpoints.MotivationalMessage.select(),
  result => ({
    data: result.data?.motivationalMessage,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
