import { DrawerActions, useNavigation } from '@react-navigation/native';

import { AppHeaderProps } from './types';
import { AppIcon } from '../AppIcon';
import AppLogo from '@/assets/icons/svg/app_logo.svg';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { Bell } from 'lucide-react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppHomeHeader({ backDisabled }: AppHeaderProps) {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  const handleBack = () => {
    if (backDisabled) {
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      className="flex-row items-center bg-background px-4 py-4 pt-safe border-b border-border shadow-md"
      style={{ paddingTop: top }}
    >
      <View className="flex-row items-center">
        <AppPressable onPress={handleOpenDrawer}>
          <AppLogo />
        </AppPressable>

        <View className="flex-1">
          <AppText variant="xl" className="ml-4 text-text">
            Outdated Me
          </AppText>
        </View>

        <AppPressable onPress={handleBack}>
          <AppIcon icon={Bell} size={32} className="text-text" count={4} />
        </AppPressable>
      </View>
    </View>
  );
}

export const NavigatorAppHomeHeader = ({ options }: NativeStackHeaderProps) => (
  <AppHomeHeader title={options.title} backDisabled={false} />
);
