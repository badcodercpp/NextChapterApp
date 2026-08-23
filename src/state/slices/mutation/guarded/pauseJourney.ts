import { ErrorLike } from '@apollo/client';
import { PauseJourneyMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiatePauseJourney } from '@/state/thunkCreators';

interface PauseJourneyState {
  pending?: boolean;
  success?: PauseJourneyMutation['pauseJourney'];
  error?: ErrorLike['message'];
}

const initialState: PauseJourneyState = {};

// Then, handle actions in your reducers:
export const pauseJourneySlice = createSlice({
  name: 'pauseJourney',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiatePauseJourney.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiatePauseJourney.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiatePauseJourney.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const pauseJourneySliceReducer = createReduxNamedReducer(
  pauseJourneySlice.reducer,
  pauseJourneySlice.name,
);
