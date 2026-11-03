import { AIChatRoutes } from './AIChatRoutes';
import { AIChatScreen } from '../screens';
import { AIChatStackParamList } from './AIChatStackParamList';
import { NavigatorAppHeader } from '@/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AIChatStackParamList>();

export function AIChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={AIChatRoutes.AIChat}
        component={AIChatScreen}
      />
    </Stack.Navigator>
  );
}
