import { NavigatorAppHeader } from '@/components';
import { ProfileRoutes } from './ProfileRoutes';
import { ProfileScreen } from '../screens';
import { ProfileStackParamList } from './ProfileStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={ProfileRoutes.ProfileScreen}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}
