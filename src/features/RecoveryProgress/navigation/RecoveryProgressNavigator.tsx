import {
  AppHeaderIconButton,
  NavigatorAppHeader,
  appHeaderOptions,
} from '@/components';

import { RecoveryProgressRoutes } from './RecoveryProgressRoutes';
import { RecoveryProgressScreen } from '../screens';
import { RecoveryProgressStackParamList } from './RecoveryProgressStackParamList';
import { Share2 } from 'lucide-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RecoveryProgressStackParamList>();

const handleSharePress = () => {};

const ShareButton = () => (
  <AppHeaderIconButton
    icon={Share2}
    accessibilityLabel="Share recovery progress"
    onPress={handleSharePress}
  />
);

export function RecoveryProgressNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Recovery Progress',
            subtitle: 'Track your healing journey',
            headerRight: ShareButton,
          }),
        }}
        name={RecoveryProgressRoutes.RecoveryProgressScreen}
        component={RecoveryProgressScreen}
      />
    </Stack.Navigator>
  );
}
