import { MasterFormData } from '@/form/types';
import { maskEmailFixed } from '@/utils';
import { useFormContext } from 'react-hook-form';

export const useVerifyIdentity = () => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext<MasterFormData>();

  const otp = getValues('verifyIdentity.otp') || [];
  const email = getValues('forgotPassword.email') || '';
  const maskedEmail = maskEmailFixed(email);

  return {
    control,
    errors,
    otp,
    email,
    maskedEmail,
  };
};
