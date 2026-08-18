import { INITIATE_RESEND_EMAIL_VERIFICATION_OTP_ACTION } from '@/state/thunkTypes';
import { ResendEmailOtpInput } from '@/__generated__/graphql';
import { ResendEmailVerificationOtpAccessor } from '@/graphql-communicator';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initiateResendEmailVerificationOtp = createAsyncThunk(
  INITIATE_RESEND_EMAIL_VERIFICATION_OTP_ACTION,
  async (input: ResendEmailOtpInput) => {
    const resendEmailVerificationOtpAccessor =
      new ResendEmailVerificationOtpAccessor();
    const initiateResendEmailVerificationOtpOutput =
      await resendEmailVerificationOtpAccessor.execute({ input });
    if (initiateResendEmailVerificationOtpOutput.error) {
      throw new Error(
        initiateResendEmailVerificationOtpOutput.error?.message ??
          'Something went wrong',
      );
    }
    return initiateResendEmailVerificationOtpOutput.data
      ?.resendEmailVerificationOtp;
  },
);
