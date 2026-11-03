import { RootState } from '../../../state';
import { createSelector } from '@reduxjs/toolkit';

const selectPrefrences = (state: RootState) => state.app.preferences;

export const selectCurrentTheme = createSelector(
  [selectPrefrences],
  data => data.theme,
);

export const selectCurrentLanguage = createSelector(
  [selectPrefrences],
  data => data.language,
);
