import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectActiveDailySession = createSelector(
  api.endpoints.ActiveDailySession.select(),
  result => ({
    data: result.data?.activeDailySession,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);

export const selectDailySessionStartMoods = createSelector(
  [selectActiveDailySession],
  data => data.data?.startMoods ?? [],
);

export const selectDailySessionEndMoods = createSelector(
  [selectActiveDailySession],
  data => data.data?.endMoods ?? [],
);

export const selectDailySessionCurrentStep = createSelector(
  [selectActiveDailySession],
  data => data.data?.currentStep,
);
