import { CompleteJourneyMutation } from '@/__generated__/graphql';
import { ErrorLike } from '@apollo/client';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateCompleteJourney } from '@/state/thunkCreators';

interface CompleteJourneyState {
  pending?: boolean;
  success?: CompleteJourneyMutation['completeJourney'];
  error?: ErrorLike['message'];
}

const initialState: CompleteJourneyState = {};

// Then, handle actions in your reducers:
export const completeJourneySlice = createSlice({
  name: 'completeJourney',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateCompleteJourney.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateCompleteJourney.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateCompleteJourney.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const completeJourneySliceReducer = createReduxNamedReducer(
  completeJourneySlice.reducer,
  completeJourneySlice.name,
);
