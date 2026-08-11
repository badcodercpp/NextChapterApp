import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OtpState {
  accessToken?: string;
}

const initialState: OtpState = {};

// Then, handle actions in your reducers:
export const authtokenSlice = createSlice({
  name: 'authtoken',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setAccessToken: (
      state,
      action: PayloadAction<{
        accessToken: string;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
    },
    resetAccessToken: state => {
      state.accessToken = undefined;
    },
  },
  extraReducers: _builder => {},
});

export const { setAccessToken, resetAccessToken } = authtokenSlice.actions;

export default authtokenSlice.reducer;
