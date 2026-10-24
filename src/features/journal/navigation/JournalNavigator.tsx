import {
  EditJournalScreen,
  JournalHistoryScreen,
  JournalScreen,
} from '../screens';

import { JournalRoutes } from './JournalRoutes';
import { JournalStackParamList } from './JournalStackParamList';
import { NavigatorAppHeader } from '@/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<JournalStackParamList>();

export function JournalNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={JournalRoutes.CreateJournal}
        component={JournalScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={JournalRoutes.JournalHistory}
        component={JournalHistoryScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={JournalRoutes.EditJournal}
        component={EditJournalScreen}
      />
    </Stack.Navigator>
  );
}
