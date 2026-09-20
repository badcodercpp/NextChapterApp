import { MentorChatRoutes } from './MentorChatRoutes';
import { MentorChatScreen } from '../screens';
import { MentorChatStackParamList } from './MentorChatStackParamList';
import { NavigatorAppHeader } from '@/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MentorChatStackParamList>();

export function MentorChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={MentorChatRoutes.MentorChat}
        component={MentorChatScreen}
      />
    </Stack.Navigator>
  );
}
