import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { DrawerActions } from '@react-navigation/native';
import { DrawerFooter } from './DrawerFooter';
import { DrawerRoutes } from '@/navigation/Drawer/DrawerRoutes';
import { DrawerHeader } from './DrawerHeader';
import { DrawerItem } from './DrawerItem';
import { DrawerPremiumCard } from './DrawerPremiumCard';
import { DrawerStats } from './DrawerStats';
import React from 'react';
import { SETTINGS_MENU } from './constants';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { AppConfirmModal } from '@/components';
import { useOptimisticLogout } from '@/features/Profile/hooks/useOptimisticLogout';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomDrawerComponent({
  navigation,
  state,
}: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const [confirmLogout, setConfirmLogout] = React.useState(false);
  const { logoutCurrentDevice, logoutAllDevices } = useOptimisticLogout();

  const currentRoute = state.routeNames[state.index];

  const navigate = (route: string) => {
    navigation.navigate(route as never);

    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View className="flex-1 bg-background">
      <LinearGradient
        colors={['#3B1A7A', '#1E1240', '#141129']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.container,
          { paddingTop: Math.max(insets.top - 8, 0), paddingBottom: Math.max(insets.bottom * 0.5, 8) },
        ]}
      >
        <DrawerHeader />

        <DrawerStats />

        <View style={styles.menu}>
          {SETTINGS_MENU.map(item => (
            <DrawerItem
              key={item.id}
              item={item}
              focused={currentRoute === item.route}
              onPress={() => navigate(item.route)}
            />
          ))}
        </View>

        <DrawerPremiumCard onPress={() => navigate(DrawerRoutes.Premium)} />

        <View style={styles.spacer} />

        <DrawerFooter onLogout={() => setConfirmLogout(true)} />
      </View>

      <AppConfirmModal
        visible={confirmLogout}
        title="Please select Signout option"
        message="You can sign out from the current device or all devices. Please select an option to proceed."
        confirmText="Current Device"
        cancelText="All Devices"
        onCancel={logoutAllDevices}
        onConfirm={logoutCurrentDevice}
        onBackdropPress={() => setConfirmLogout(false)}
      />
    </View>
  );
}

export const CustomDrawer = (props: DrawerContentComponentProps) => (
  <CustomDrawerComponent {...props} />
);
