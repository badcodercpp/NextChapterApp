import { ErrorLike } from '@apollo/client';
import { RefreshTokenMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateRefreshToken } from '@/state/thunkCreators';

interface RefreshTokenState {
  pending?: boolean;
  success?: RefreshTokenMutation['refreshToken'];
  error?: ErrorLike['message'];
}

const initialState: RefreshTokenState = {};

// Then, handle actions in your reducers:
export const refreshTokenSlice = createSlice({
  name: 'refreshToken',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateRefreshToken.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateRefreshToken.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateRefreshToken.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const refreshTokenSliceReducer = createReduxNamedReducer(
  refreshTokenSlice.reducer,
  refreshTokenSlice.name,
);
