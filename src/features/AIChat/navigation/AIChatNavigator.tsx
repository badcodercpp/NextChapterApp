import { AIChatRoutes } from './AIChatRoutes';
import { AIChatScreen } from '../screens';
import { AIChatStackParamList } from './AIChatStackParamList';
import { NavigatorAppHeader, appHeaderOptions } from '@/components';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AIChatStackParamList>();

const OnlineDot = () => (
  <View
    accessibilityLabel="Online"
    className="h-2.5 w-2.5 rounded-full bg-success-v2"
  />
);

export function AIChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'AI Coach Chat',
            subtitle: 'Your 24/7 support, always here for you',
            headerTitleAccessory: OnlineDot,
          }),
        }}
        name={AIChatRoutes.AIChat}
        component={AIChatScreen}
      />
    </Stack.Navigator>
  );
}
