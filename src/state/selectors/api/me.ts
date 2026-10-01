import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectMe = createSelector(api.endpoints.Me.select(), result => ({
  data: result.data?.me,
  loading: result.isLoading,
  isError: result.isError,
  error: result.error,
}));
