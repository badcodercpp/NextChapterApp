import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AppTheme } from '@/features/Settings/constants';
import { TLanguageCode } from '@/translation/types';

interface PreferencesState {
  theme: AppTheme;
  language: TLanguageCode; // Optional language preference
}

const initialState: PreferencesState = {
  theme: 'dark',
  language: 'en-IN', // Set a default language
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setThemePreference: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },

    setLanguagePreference: (state, action: PayloadAction<TLanguageCode>) => {
      state.language = action.payload;
    },
  },
});

export const { setThemePreference, setLanguagePreference } =
  preferencesSlice.actions;
export default preferencesSlice;
