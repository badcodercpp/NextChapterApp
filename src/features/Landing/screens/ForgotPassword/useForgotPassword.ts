import { MasterFormData } from '@/form/types';
import { useFormContext } from 'react-hook-form';

export const useForgotPassword = () => {
  const {
    control,
    formState: { errors },
    // getValues,
    clearErrors,
  } = useFormContext<MasterFormData>();

  return {
    control,
    errors,
    clearErrors,
  };
};
