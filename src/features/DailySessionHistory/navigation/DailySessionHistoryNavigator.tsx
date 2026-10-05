import { DailySessionHistoryRoutes } from './DailySessionHistoryRoutes';
import { DailySessionHistoryScreen } from '../screens';
import { DailySessionHistoryStackParamList } from './DailySessionHistoryStackParamList';
import { NavigatorAppHeader } from '@/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<DailySessionHistoryStackParamList>();

export function DailySessionHistoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={DailySessionHistoryRoutes.DailySessionHistory}
        component={DailySessionHistoryScreen}
      />
    </Stack.Navigator>
  );
}
