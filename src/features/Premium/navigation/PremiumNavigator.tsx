import { NavigatorAppDrawerScreenHeader, appHeaderOptions } from '@/components';

import { PremiumScreen } from '../screens/PremiumScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function PremiumNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PremiumScreen"
        component={PremiumScreen}
        options={{
          headerShown: true,
          header: NavigatorAppDrawerScreenHeader,
          ...appHeaderOptions({ title: 'Go Premium' }),
        }}
      />
    </Stack.Navigator>
  );
}
