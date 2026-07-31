import { ChallengeScreen } from '../screens/ChallengeScreen/ChallengeScreen';
import { HomeRoutes } from './HomeRoutes';
import { HomeScreen } from '../screens/HomeScreen';
import { HomeStackParamList } from './HomeStackParamList';
import { InsightScreen } from '../screens/InsightScreen/InsightScreen';
import { ReflectionScreen } from '../screens/ReflectionScreen/ReflectionScreen';
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

      <Stack.Screen name={HomeRoutes.Reflection} component={ReflectionScreen} />

      <Stack.Screen name={HomeRoutes.Insight} component={InsightScreen} />

      <Stack.Screen name={HomeRoutes.Challenge} component={ChallengeScreen} />
    </Stack.Navigator>
  );
}
