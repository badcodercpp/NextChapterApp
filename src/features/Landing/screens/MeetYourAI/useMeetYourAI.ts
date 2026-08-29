import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useMeetYourAI = () => {
  const navigation = useNavigation<LandingNavigationProp>();
  const submitMeetYourAI = useCallback(() => {
    navigation.navigate('CreateAccount');
  }, [navigation]);

  return {
    submitMeetYourAI,
  };
};
