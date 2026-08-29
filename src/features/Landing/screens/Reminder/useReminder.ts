import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useReminder = () => {
  const navigation = useNavigation<LandingNavigationProp>();

  const submitReminder = useCallback(() => {
    navigation.navigate('RecoveryStartsToday');
  }, [navigation]);

  const skipReminder = useCallback(() => {
    navigation.navigate('RecoveryStartsToday');
  }, [navigation]);

  return {
    submitReminder,
    skipReminder,
  };
};
