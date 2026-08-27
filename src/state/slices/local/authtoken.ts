import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createReduxNamedReducer } from 'redux-named-reducer';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

interface AuthtokenState {
  authStatus: AuthStatus;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: AuthtokenState = {
  authStatus: 'checking' as AuthStatus,
};

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
        authStatus: AuthStatus;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.authStatus = action.payload.authStatus;
    },
    resetAuthTokens: state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
    setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authStatus = action.payload;
    },
    resetAuthStatus: state => {
      state.authStatus = 'checking';
    },
  },
  extraReducers: _builder => {},
});

export const {
  setAuthTokens,
  resetAuthTokens,
  setAuthStatus,
  resetAuthStatus,
} = authtokenSlice.actions;

export const authtokenSliceReducer = createReduxNamedReducer(
  authtokenSlice.reducer,
  authtokenSlice.name,
);
