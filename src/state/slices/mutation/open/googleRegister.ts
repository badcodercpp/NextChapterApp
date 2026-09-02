import { ErrorLike } from '@apollo/client';
import { GoogleRegisterMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateGoogleRegister } from '@/state/thunkCreators';

interface GoogleRegisterState {
  pending?: boolean;
  success?: GoogleRegisterMutation['googleRegister'];
  error?: ErrorLike['message'];
}

const initialState: GoogleRegisterState = {};

// Then, handle actions in your reducers:
export const googleRegisterSlice = createSlice({
  name: 'googleRegister',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateGoogleRegister.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateGoogleRegister.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateGoogleRegister.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const googleRegisterSliceReducer = createReduxNamedReducer(
  googleRegisterSlice.reducer,
  googleRegisterSlice.name,
);
