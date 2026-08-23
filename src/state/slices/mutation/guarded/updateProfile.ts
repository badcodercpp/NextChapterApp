import { ErrorLike } from '@apollo/client';
import { UpdateProfileMutation } from '@/__generated__/graphql';
import { createReduxNamedReducer } from 'redux-named-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { initiateUpdateProfile } from '@/state/thunkCreators';

interface UpdateProfileState {
  pending?: boolean;
  success?: UpdateProfileMutation['updateProfile'];
  error?: ErrorLike['message'];
}

const initialState: UpdateProfileState = {};

// Then, handle actions in your reducers:
export const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // start loading
    builder

      // start
      .addCase(initiateUpdateProfile.pending, state => {
        state.pending = true;
      })
      // success
      .addCase(initiateUpdateProfile.fulfilled, (state, action) => {
        state.pending = false;
        // Add Claims to the state array
        state.success = action.payload;
      })
      // rejected
      .addCase(initiateUpdateProfile.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const updateProfileSliceReducer = createReduxNamedReducer(
  updateProfileSlice.reducer,
  updateProfileSlice.name,
);
