import { type RootState } from '../../../state';

const getLoginSlice = (state: RootState) => ({
  pending: state.loginSlice.pending,
  success: state.loginSlice.success,
  error: state.loginSlice.error,
});

export { getLoginSlice };
