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
      className="border-b border-border bg-background px-4 pb-3"
      style={{ paddingTop: top + 8 }}
    >
      <View className="flex-row items-center gap-3">
        <AppAvatar
          size="sm"
          name={me?.displayName ?? ''}
          uri={toHttpsURL(me?.avatarUrl) ?? undefined}
          onPress={handleOpenDrawer}
        />

        <View className="flex-1">
          <AppText
            variant="lg"
            className="font-semibold text-text-v2"
            numberOfLines={1}
          >
            {t(getGreetingKey())}, {me?.displayName?.split(' ')?.[0] ?? ''}
          </AppText>
        </View>

        <AppPressable
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          className="h-11 w-11 items-center justify-center"
        >
          <AppIcon
            icon={Bell}
            size={32}
            className="text-primary-v2"
            count={4}
          />
        </AppPressable>
      </View>
    </View>
  );
}

export const NavigatorAppHomeHeader = (props: NativeStackHeaderProps) => (
  <AppHomeHeader {...props} title={props.options.title} backDisabled={false} />
);
