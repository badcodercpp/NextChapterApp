import { INITIATE_REGISTER_ACTION } from '@/state/thunkTypes';
import { RegisterAccessor } from '@/graphql-communicator';
import { RegisterInput } from '@/__generated__/graphql';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateRegister = createAsyncThunk(
  INITIATE_REGISTER_ACTION,
  async (input: RegisterInput) => {
    const registerAccessor = new RegisterAccessor();
    const initiateRegisterOutput = await registerAccessor.execute({
      input,
    });
    if (initiateRegisterOutput.error) {
      throw new Error(
        initiateRegisterOutput.error?.message ?? 'Something went wrong',
      );
    }
    return initiateRegisterOutput.data?.register;
  },
);
