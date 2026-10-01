import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectMyRecovery = createSelector(
  api.endpoints.MyRecovery.select(),
  result => ({
    data: result.data?.myRecovery,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
