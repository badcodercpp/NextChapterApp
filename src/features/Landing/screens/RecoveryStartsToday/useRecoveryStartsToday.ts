import { RouteProp, useRoute } from '@react-navigation/native';

import { AppDispatch } from '@/state';
import { LandingStackParamList } from '@/features/Landing/navigation/LandingStackParamList';
import { setAuthTokens } from '@/state/slices/local/authtoken';
import { showToast } from '@/components';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

type ProfileRouteProp = RouteProp<LandingStackParamList, 'RecoveryStartsToday'>;

export const useRecoveryStartsToday = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute<ProfileRouteProp>();
  const { accessToken, refreshToken } = route.params ?? {};

  const submitRecoveryStartsToday = useCallback(() => {
    // no navigation from here root stack navigator handle this
    // navigation.navigate('Home');
    if (!(accessToken && refreshToken)) {
      showToast('Please login to continue', 'error');
    }
    dispatch(
      setAuthTokens({
        accessToken: accessToken ?? '',
        refreshToken: refreshToken ?? '',
        authStatus: 'authenticated',
      }),
    );
  }, [accessToken, dispatch, refreshToken]);

  return {
    submitRecoveryStartsToday,
  };
};
