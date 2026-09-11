import { HomeRoutes } from './HomeRoutes';
import { HomeScreen } from '../screens/HomeScreen';
import { HomeStackParamList } from './HomeStackParamList';
import { NavigatorAppHomeHeader } from '@/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHomeHeader,
        }}
        name={HomeRoutes.Home}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}
