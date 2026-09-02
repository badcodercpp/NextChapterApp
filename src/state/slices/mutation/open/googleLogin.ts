import { ErrorLike } from '@apollo/client';
import { GoogleLoginMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateGoogleLogin } from '@/state/thunkCreators';

interface GoogleLoginState {
  pending?: boolean;
  success?: GoogleLoginMutation['googleLogin'];
  error?: ErrorLike['message'];
}

const initialState: GoogleLoginState = {};

// Then, handle actions in your reducers:
export const googleLoginSlice = createSlice({
  name: 'googleLogin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateGoogleLogin.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateGoogleLogin.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateGoogleLogin.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const googleLoginSliceReducer = createReduxNamedReducer(
  googleLoginSlice.reducer,
  googleLoginSlice.name,
);
