import { ErrorLike } from '@apollo/client';
import { LogoutMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateLogout } from '@/state/thunkCreators';

interface LogoutState {
  pending?: boolean;
  success?: LogoutMutation['logout'];
  error?: ErrorLike['message'];
}

const initialState: LogoutState = {};

// Then, handle actions in your reducers:
export const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateLogout.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateLogout.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateLogout.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const logoutSliceReducer = createReduxNamedReducer(
  logoutSlice.reducer,
  logoutSlice.name,
);
