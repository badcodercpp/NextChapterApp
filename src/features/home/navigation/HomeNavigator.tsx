import { HomeRoutes } from './HomeRoutes';
import { HomeScreen } from '../screens/HomeScreen';
import { HomeStackParamList } from './HomeStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={HomeRoutes.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
}
