import { DrawerActions } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { ChevronLeft } from 'lucide-react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon, AppPressable, AppText } from '@/components';

export function ProfileScreenHeader({ navigation, options }: NativeStackHeaderProps) {
  const { top } = useSafeAreaInsets();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      className="bg-background px-4"
      style={{ paddingTop: top }}
    >
      <View className="relative h-14 flex-row items-center justify-center">
        <AppPressable
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute bottom-0 left-0 top-0 justify-center"
        >
          <AppIcon icon={ChevronLeft} size={32} className="text-text-v2" />
        </AppPressable>
        <AppText
          variant="2xl"
          className="font-bold text-text"
          accessibilityRole="header"
        >
          {options.title ?? 'Profile'}
        </AppText>
      </View>
    </View>
  );
}
