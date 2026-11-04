import { useCallback, useEffect, useState } from 'react';

import { AccountSettingItem } from '@/features/Profile/components/AccountSettings';
import { useOptimisticLogout } from './useOptimisticLogout';

export const useAccountRowItemAction = () => {
  const [showProceedModal, setShowProceedModal] = useState<boolean>(false);

  const {
    logoutCurrentDevice,
    logoutAllDevices,
    isPendingCurrentDeviceLogout,
    isPendingAllDeviceLogout,
    optimisticLogoutCurrentDevice,
    optimisticLogoutAllDevices,
  } = useOptimisticLogout();

  const onAccountRowItemPress = useCallback((item: AccountSettingItem) => {
    if (item.id === 'sign-out') {
      setShowProceedModal(true);
    }
  }, []);

  useEffect(() => {
    if (optimisticLogoutCurrentDevice || optimisticLogoutAllDevices) {
      // navigation.navigate('LandingStack', { screen: LandingRoutes.Landing });
    }
  }, [optimisticLogoutCurrentDevice, optimisticLogoutAllDevices]);

  return {
    onAccountRowItemPress,
    showProceedModal,
    setShowProceedModal,
    logoutCurrentDevice,
    logoutAllDevices,
    isPendingCurrentDeviceLogout,
    isPendingAllDeviceLogout,
    optimisticLogoutCurrentDevice,
    optimisticLogoutAllDevices,
  };
};
