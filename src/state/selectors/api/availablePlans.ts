import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectAvailablePlans = createSelector(
  api.endpoints.AvailablePlans.select(),
  result => ({
    data: result.data?.availablePlans,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
