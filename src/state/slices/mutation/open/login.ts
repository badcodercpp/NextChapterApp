import { ErrorLike } from '@apollo/client';
import { LoginMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateLogin } from '@/state/thunkCreators';

interface LoginState {
  pending?: boolean;
  success?: LoginMutation['login'];
  error?: ErrorLike['message'];
}

const initialState: LoginState = {};

// Then, handle actions in your reducers:
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateLogin.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateLogin.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateLogin.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const loginSliceReducer = createReduxNamedReducer(
  loginSlice.reducer,
  loginSlice.name,
);
