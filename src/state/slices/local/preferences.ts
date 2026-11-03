import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { AppTheme } from '@/features/Settings/constants';

interface PreferencesState {
  theme: AppTheme;
}

const initialState: PreferencesState = {
  theme: 'dark',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setThemePreference: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setThemePreference } = preferencesSlice.actions;
export default preferencesSlice;
