import { NavigatorAppDrawerScreenHeader, appHeaderOptions } from '@/components';

import { RateUsScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function RateUsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RateUsScreen"
        component={RateUsScreen}
        options={{
          headerShown: true,
          header: NavigatorAppDrawerScreenHeader,
          ...appHeaderOptions({ title: 'Rate Us' }),
        }}
      />
    </Stack.Navigator>
  );
}
