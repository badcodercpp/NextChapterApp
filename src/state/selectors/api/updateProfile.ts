import { RTKQueryFixedCacheKey } from '@/api/fixedCacheKey';
import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectUpdateProfile = createSelector(
  api.endpoints.UpdateProfile.select(RTKQueryFixedCacheKey.UPDATE_PROFILE),
  result => ({
    data: result.data?.updateProfile,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);

export const selectUpdateProfileUpdatedFields = createSelector(
  [selectUpdateProfile],
  data => data.data?.updatedFields,
);
