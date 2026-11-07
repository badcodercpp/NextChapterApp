import { DailySessionHistoryRoutes } from './DailySessionHistoryRoutes';
import { DailySessionHistoryScreen } from '../screens';
import { DailySessionHistoryStackParamList } from './DailySessionHistoryStackParamList';
import { NavigatorAppHeader, appHeaderOptions } from '@/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<DailySessionHistoryStackParamList>();

export function DailySessionHistoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Session History',
            subtitle: 'Look back on your healing journey',
          }),
        }}
        name={DailySessionHistoryRoutes.DailySessionHistory}
        component={DailySessionHistoryScreen}
      />
    </Stack.Navigator>
  );
}
