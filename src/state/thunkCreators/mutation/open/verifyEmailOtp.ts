import { INITIATE_VERIFY_EMAIL_OTP_ACTION } from '@/state/thunkTypes';
import { VerifyEmailOtpAccessor } from '@/graphql-communicator';
import { VerifyEmailOtpInput } from '@/__generated__/graphql';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateVerifyEmailOtp = createAsyncThunk(
  INITIATE_VERIFY_EMAIL_OTP_ACTION,
  async (input: VerifyEmailOtpInput) => {
    const verifyEmailOtpAccessor = new VerifyEmailOtpAccessor();
    const verifyEmailOtpOutput = await verifyEmailOtpAccessor.execute({
      input,
    });
    if (verifyEmailOtpOutput.error) {
      throw new Error(
        verifyEmailOtpOutput.error?.message ?? 'Something went wrong',
      );
    }
    return verifyEmailOtpOutput.data?.verifyEmailOtp;
  },
);
