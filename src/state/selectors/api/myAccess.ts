import { AccessLevel, api } from '@/__generated__/graphql';

import { createSelector } from '@reduxjs/toolkit';

export const selectMyAccess = createSelector(
  api.endpoints.MyAccess.select(),
  result => ({
    data: result.data?.myAccess,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);

export const selectIsPremiumOrFreeTrialUser = createSelector(
  [selectMyAccess],
  data =>
    !!(
      data.data?.level === AccessLevel.FreeTrial ||
      data.data?.level === AccessLevel.Premium
    ),
);

export const selectIsPremiumUser = createSelector(
  [selectMyAccess],
  data => !!(data.data?.level === AccessLevel.Premium),
);

export const selectIsFreeTrialUser = createSelector(
  [selectMyAccess],
  data => !!(data.data?.level === AccessLevel.FreeTrial),
);

export const selectIsFreeTrialExpiredUser = createSelector(
  [selectMyAccess],
  data => !!(data.data?.level === AccessLevel.FreeExpired),
);

export const selectCanAccessDailySession = createSelector(
  [selectMyAccess],
  data => !!data.data?.canAccessDailySessions,
);
