import { LandingScreen, WhatBringsYouHereScreen } from '../screens';

import { LandingRoutes } from './LandingRoutes';
import { LandingStackParamList } from './LandingStackParamList';
import { NavigatorAppHeader } from '@/components/foundation/AppHeader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<LandingStackParamList>();

export function LandingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: NavigatorAppHeader,
      }}
    >
      <Stack.Screen
        name={LandingRoutes.Landing}
        component={LandingScreen}
        options={{
          title: 'Landing',
        }}
      />
      <Stack.Screen
        name={LandingRoutes.WhatBringsYouHere}
        component={WhatBringsYouHereScreen}
        options={{
          title: 'What brings you here?',
        }}
      />
    </Stack.Navigator>
  );
}
