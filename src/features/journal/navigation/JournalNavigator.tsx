import { CreateJournalScreen } from '../screens/CreateJournalScreen/CreateJournalScreen';
import { JournalDetailsScreen } from '../screens/JournalDetailsScreen';
import { JournalRoutes } from './JournalRoutes';
import { JournalScreen } from '@/features/journal/screens/JournalScreen';
import { JournalStackParamList } from './JournalStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<JournalStackParamList>();

export function JournalNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={JournalRoutes.Journal} component={JournalScreen} />

      <Stack.Screen
        name={JournalRoutes.CreateJournal}
        component={CreateJournalScreen}
      />

      <Stack.Screen
        name={JournalRoutes.JournalDetails}
        component={JournalDetailsScreen}
      />
    </Stack.Navigator>
  );
}
