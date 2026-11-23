import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectCurrentSessionReflection = createSelector(
  api.endpoints.CurrentSessionReflection.select(),
  result => ({
    data: result.data?.currentSessionReflection,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
