import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createReduxNamedReducer } from 'redux-named-reducer';

interface AuthtokenState {
  accessToken?: string;
  refreshToken?: string;
}

const initialState: AuthtokenState = {};

// Then, handle actions in your reducers:
export const authtokenSlice = createSlice({
  name: 'authtoken',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setAuthTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    resetAuthTokens: state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
  extraReducers: _builder => {},
});

export const { setAuthTokens, resetAuthTokens } = authtokenSlice.actions;

export const authtokenSliceReducer = createReduxNamedReducer(
  authtokenSlice.reducer,
  authtokenSlice.name,
);
