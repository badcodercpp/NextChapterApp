import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { mapZodErrorsToForm } from '@/utils';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { whatWouldYouLikeHelpWithSchema } from '@/form';

export const useWhatWouldYouLikeHelpWith = () => {
  const navigation = useNavigation<LandingNavigationProp>();
  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const submitWhatWouldYouLikeHelpWith = useCallback(() => {
    const whatWouldYouLikeHelpWith = getValues('whatWouldYouLikeHelpWith');
    const result = whatWouldYouLikeHelpWithSchema.safeParse(
      whatWouldYouLikeHelpWith,
    );
    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'howAreYouFeeling', // Pass your master context namespace here
      });
      return;
    }

    navigation.navigate('MeetYourAI');
  }, [navigation, getValues, setError, clearErrors]);

  return {
    control,
    errors,
    submitWhatWouldYouLikeHelpWith,
  };
};
