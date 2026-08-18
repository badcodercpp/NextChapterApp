import { type RootState } from '../../../state';

const getAuthtokenSlice = (state: RootState) => ({
  accessToken: state.authtokenSlice.accessToken,
  refreshToken: state.authtokenSlice.refreshToken,
});

export { getAuthtokenSlice };
