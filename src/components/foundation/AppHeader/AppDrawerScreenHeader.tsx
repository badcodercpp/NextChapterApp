import { DrawerActions, useNavigation } from '@react-navigation/native';

import { AppHeaderProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { ChevronLeft } from 'lucide-react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppDrawerScreenHeader({
  title,
  subtitle,
  titleAccessory,
  subtitleAccessory,
  right,
  backDisabled,
  onBack,
}: AppHeaderProps & { onBack?: () => void }) {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  const handleBack = () => {
    if (backDisabled) {
      return;
    }

    if (onBack) {
      onBack();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
      navigation.dispatch(DrawerActions.openDrawer());
    }
  };

  return (
    <View
      className="flex-row items-center gap-3 border-b border-border-v2 bg-background-v2 px-3 pb-2"
      style={{ paddingTop: top }}
    >
      <AppPressable
        onPress={handleBack}
        disabled={backDisabled}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="h-11 w-11 items-start justify-center rounded-full bg-transparent px-none"
      >
        <AppIcon icon={ChevronLeft} size={32} className="text-text-v2" />
      </AppPressable>

      <View className="flex-1">
        {!!title && (
          <View className="flex-row items-center gap-2">
            <AppText
              variant="lg"
              className="shrink font-bold text-text-v2"
              numberOfLines={1}
              accessibilityRole="header"
            >
              {title}
            </AppText>
            {titleAccessory}
          </View>
        )}
        {!!subtitle && (
          <View className="mt-0.5 flex-row items-center gap-1.5">
            <AppText
              variant="xs"
              className="shrink text-text-muted-v2"
              numberOfLines={1}
            >
              {subtitle}
            </AppText>
            {subtitleAccessory}
          </View>
        )}
      </View>

      {right}
    </View>
  );
}

export const NavigatorAppDrawerScreenHeader = (
  props: NativeStackHeaderProps,
) => (
  <AppDrawerScreenHeader
    {...props}
    title={props.options.title}
    backDisabled={false}
    onBack={props.back ? props.navigation.goBack : undefined}
  />
);
