import { INITIATE_LOGIN_ACTION } from '@/state/thunkTypes';
import { LoginAccessor } from '@/graphql-communicator/accessor/login';
import { LoginInput } from '@/__generated__/graphql';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateLogin = createAsyncThunk(
  INITIATE_LOGIN_ACTION,
  async (input: LoginInput) => {
    const loginAccessor = new LoginAccessor();
    const initiateLoginOutput = await loginAccessor.initiateLogin({ input });
    if (initiateLoginOutput.error) {
      throw new Error(
        initiateLoginOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateLoginOutput;
  },
);
