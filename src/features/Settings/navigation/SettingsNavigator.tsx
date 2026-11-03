import { NavigatorAppHeader } from '@/components';
import { SettingsRoutes } from './SettingsRoutes';
import { SettingsScreen } from '../screens';
import { SettingsStackParamList } from './SettingsStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={SettingsRoutes.SettingsScreen}
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}
