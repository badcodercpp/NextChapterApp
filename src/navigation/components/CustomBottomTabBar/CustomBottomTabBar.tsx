import {
  BookIcon,
  ChartBarIcon,
  HomeIcon,
  LucideIcon,
  SparklesIcon,
  UserIcon,
} from 'lucide-react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabButton } from './TabButton';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';
import { View } from 'react-native';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICONS: Record<string, LucideIcon> = {
  [TabRoutes.Home]: HomeIcon,

  [TabRoutes.Journal]: BookIcon,

  [TabRoutes.AI]: SparklesIcon,

  [TabRoutes.Progress]: ChartBarIcon,

  [TabRoutes.Profile]: UserIcon,
};

export function CustomBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.parentContainer}>
      <View style={[styles.container, { bottom: insets.bottom }]}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;

          const label = descriptors[route.key].options.title ?? route.name;

          return (
            <TabButton
              key={route.key}
              focused={focused}
              icon={ICONS[route.name]}
              label={label}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
}

export const BottomTabBar = (props: BottomTabBarProps) => (
  <CustomBottomTabBar {...props} />
);
