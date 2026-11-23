import { NavigatorAppDrawerScreenHeader, appHeaderOptions } from '@/components';

import { HelpScreen } from '../screens/HelpScreen';
import { HelpTopicScreen } from '../screens/HelpTopicScreen';
import type { HelpStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<HelpStackParamList>();

export function HelpNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: NavigatorAppDrawerScreenHeader,
        ...appHeaderOptions({ title: 'Help' }),
      }}
    >
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="HelpTopic" component={HelpTopicScreen} />
    </Stack.Navigator>
  );
}
