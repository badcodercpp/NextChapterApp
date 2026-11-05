import {
  EditJournalScreen,
  JournalHistoryScreen,
  JournalScreen,
} from '../screens';
import {
  AppHeaderIconButton,
  NavigatorAppHeader,
  appHeaderOptions,
} from '@/components';

import { JournalRoutes } from './JournalRoutes';
import { JournalStackParamList } from './JournalStackParamList';
import { Search } from 'lucide-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<JournalStackParamList>();

const JournalSearchButton = () => (
  <AppHeaderIconButton icon={Search} accessibilityLabel="Search journals" />
);

export function JournalNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Journal',
            subtitle: 'Your safe space to heal and grow',
          }),
        }}
        name={JournalRoutes.CreateJournal}
        component={JournalScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Journals',
            subtitle: 'Your journal histories',
            headerRight: JournalSearchButton,
          }),
        }}
        name={JournalRoutes.JournalHistory}
        component={JournalHistoryScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Journal',
            subtitle: 'Your safe space to heal and grow',
          }),
        }}
        name={JournalRoutes.EditJournal}
        component={EditJournalScreen}
      />
    </Stack.Navigator>
  );
}
