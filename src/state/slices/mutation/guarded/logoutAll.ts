import { ErrorLike } from '@apollo/client';
import { LogoutAllMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateLogoutAll } from '@/state/thunkCreators';

interface LogoutAllState {
  pending?: boolean;
  success?: LogoutAllMutation['logoutAll'];
  error?: ErrorLike['message'];
}

const initialState: LogoutAllState = {};

// Then, handle actions in your reducers:
export const logoutAllSlice = createSlice({
  name: 'logoutAll',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateLogoutAll.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateLogoutAll.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateLogoutAll.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const logoutAllSliceReducer = createReduxNamedReducer(
  logoutAllSlice.reducer,
  logoutAllSlice.name,
);
