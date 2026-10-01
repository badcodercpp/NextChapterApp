import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectActiveJourney = createSelector(
  api.endpoints.ActiveJourney.select(),
  result => ({
    data: result.data?.activeJourney,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
