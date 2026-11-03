import { AIChatRoutes } from './AIChatRoutes';
import { AIChatScreen } from '../screens';
import { AIChatStackParamList } from './AIChatStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AIChatStackParamList>();

export function AIChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={AIChatRoutes.AIChat}
        component={AIChatScreen}
      />
    </Stack.Navigator>
  );
}
