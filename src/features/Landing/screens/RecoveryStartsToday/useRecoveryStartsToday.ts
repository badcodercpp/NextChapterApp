import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useRecoveryStartsToday = () => {
  const navigation = useNavigation<LandingNavigationProp>();

  const submitRecoveryStartsToday = useCallback(() => {
    navigation.navigate('CreateAccount');
  }, [navigation]);

  return {
    submitRecoveryStartsToday,
  };
};
