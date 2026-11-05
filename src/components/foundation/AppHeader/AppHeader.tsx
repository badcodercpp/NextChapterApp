import { AppHeaderOptions, AppHeaderProps } from './types';

import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { ChevronLeft } from 'lucide-react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppHeader({
  title,
  subtitle,
  titleAccessory,
  right,
  backDisabled,
}: AppHeaderProps) {
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

  return (
    <View
      className="flex-row items-center gap-3 border-b border-border bg-background px-3 pb-3"
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
          <AppText
            variant="xs"
            className="mt-0.5 text-text-muted-v2"
            numberOfLines={1}
          >
            {subtitle}
          </AppText>
        )}
      </View>

      {right}
    </View>
  );
}

export const appHeaderOptions = (options: AppHeaderOptions): AppHeaderOptions =>
  options;

export const NavigatorAppHeader = (props: NativeStackHeaderProps) => {
  const options = props.options as AppHeaderOptions;

  return (
    <AppHeader
      {...props}
      title={options.title}
      subtitle={options.subtitle}
      titleAccessory={options.headerTitleAccessory?.()}
      right={options.headerRight?.({
        canGoBack: props.navigation.canGoBack(),
      })}
      backDisabled={options.backDisabled ?? false}
    />
  );
};
