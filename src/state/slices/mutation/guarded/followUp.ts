import { ErrorLike } from '@apollo/client';
import { FollowUpMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiatefollowUp } from '@/state/thunkCreators';

interface FollowUpState {
  pending?: boolean;
  success?: FollowUpMutation['followUp'];
  error?: ErrorLike['message'];
}

const initialState: FollowUpState = {};

// Then, handle actions in your reducers:
export const followUpSlice = createSlice({
  name: 'followUp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiatefollowUp.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiatefollowUp.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiatefollowUp.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const followUpSliceReducer = createReduxNamedReducer(
  followUpSlice.reducer,
  followUpSlice.name,
);
