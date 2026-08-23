import { ErrorLike } from '@apollo/client';
import { MeQuery } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateGetMe } from '@/state/thunkCreators';

interface GetMeState {
  pending?: boolean;
  success?: MeQuery['me'];
  error?: ErrorLike['message'];
}

const initialState: GetMeState = {};

// Then, handle actions in your reducers:
export const getMeSlice = createSlice({
  name: 'getMe',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateGetMe.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateGetMe.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateGetMe.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const getMeSliceReducer = createReduxNamedReducer(
  getMeSlice.reducer,
  getMeSlice.name,
);
