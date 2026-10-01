import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectApplicationConfig = createSelector(
  api.endpoints.ApplicationConfig.select(),
  result => ({
    data: result.data?.applicationConfig,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
