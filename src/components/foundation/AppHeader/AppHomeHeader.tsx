import { DrawerActions, useNavigation } from '@react-navigation/native';
import { getGreetingKey, toHttpsURL } from '@/utils';

import { AppAvatar } from '@/components/foundation/AppAvatar';
import { AppHeaderProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { Bell } from 'lucide-react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { selectMe } from '@/state/selectors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export function AppHomeHeader({ backDisabled }: AppHeaderProps) {
  const { data: me } = useSelector(selectMe);
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();

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
      className="flex-row items-center bg-background px-4 py-3 pt-safe border-b border-border shadow-md"
      style={{ paddingTop: top }}
    >
      <View className="flex-row items-center">
        <AppAvatar
          size="sm"
          name={me?.displayName ?? ''}
          uri={toHttpsURL(me?.avatarUrl) ?? undefined}
          onPress={handleOpenDrawer}
        />

        <View className="flex-1">
          <AppText variant="xl" className="ml-3 text-text">
            {t(getGreetingKey())}, {me?.displayName?.split(' ')?.[0] ?? ''}{' '}
          </AppText>
        </View>

        <AppPressable onPress={handleBack}>
          <AppIcon icon={Bell} size={32} className="text-text" count={4} />
        </AppPressable>
      </View>
    </View>
  );
}

export const NavigatorAppHomeHeader = (props: NativeStackHeaderProps) => (
  <AppHomeHeader {...props} title={props.options.title} backDisabled={false} />
);
