import { NavigatorAppHeader } from '@/components';
import { RecoveryProgressRoutes } from './RecoveryProgressRoutes';
import { RecoveryProgressScreen } from '../screens';
import { RecoveryProgressStackParamList } from './RecoveryProgressStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RecoveryProgressStackParamList>();

export function RecoveryProgressNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={RecoveryProgressRoutes.RecoveryProgressScreen}
        component={RecoveryProgressScreen}
      />
    </Stack.Navigator>
  );
}
