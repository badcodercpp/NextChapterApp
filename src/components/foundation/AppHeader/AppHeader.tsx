// components/AppHeader/index.tsx

import { AppHeaderProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { ArrowLeft } from 'lucide-react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppHeader({ title }: AppHeaderProps) {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center bg-background px-6 py-4 pt-safe border-b border-border shadow-md"
      style={{ paddingTop: top }}
    >
      <AppPressable
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      >
        <AppIcon icon={ArrowLeft} size={22} className="text-text" />
      </AppPressable>

      {title && (
        <AppText variant="xl" className="ml-4 text-text">
          {title}
        </AppText>
      )}
    </View>
  );
}

export const NavigatorAppHeader = ({ options }: NativeStackHeaderProps) => (
  <AppHeader title={options.title} />
);
