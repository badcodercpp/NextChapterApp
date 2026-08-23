import { ErrorLike } from '@apollo/client';
import { RegisterMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateRegister } from '@/state/thunkCreators';

interface RegisterState {
  pending?: boolean;
  success?: RegisterMutation['register'];
  error?: ErrorLike['message'];
}

const initialState: RegisterState = {};

// Then, handle actions in your reducers:
export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateRegister.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateRegister.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateRegister.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const registerSliceReducer = createReduxNamedReducer(
  registerSlice.reducer,
  registerSlice.name,
);
