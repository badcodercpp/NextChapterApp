import { Journal, JournalCategory } from '../../types';
import { JournalRoutes, JournalStackParamList } from '../../navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { AppFAB } from '@/components/foundation/AppFAB';
import { AppScreen } from '@/components/foundation/AppScreen';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { JournalList } from '../../components/JournalList';
import { JournalListHeader } from '../../components/JournalListHeader';
import { JournalSearchBar } from '../../components/JournalSearchBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus } from 'lucide-react-native';
import { View } from 'react-native';
import { mockJournals } from '../../mocks/journals';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<JournalStackParamList>;

export function JournalScreen() {
  const [allJournals, setAllJournals] = useState<Journal[]>(mockJournals);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<JournalCategory | undefined>(
    JournalCategory.All,
  );

  const navigation = useNavigation<NavigationProp>();

  const handleJournalPress = useCallback(
    (journal: Journal) => {
      console.log('Open journal', journal.id);
      navigation.navigate(JournalRoutes.JournalDetails);

      // navigation.navigate(...)
    },
    [navigation],
  );

  const handleCreateJournal = useCallback(() => {
    console.log('Create Journal');
    navigation.navigate(JournalRoutes.CreateJournal);

    // navigation.navigate(...)
  }, [navigation]);

  useEffect(() => {
    if (category === JournalCategory.All) {
      setAllJournals(mockJournals);
      return;
    }
    setAllJournals(
      mockJournals.filter(journal => journal.category === category),
    );
  }, [category]);

  return (
    <AppScreen horizontalPadding="lg">
      <View>
        <JournalListHeader />
      </View>

      <JournalSearchBar value={search} onChangeText={setSearch} />

      <View>
        <CategorySelector value={category} onChange={setCategory} />
      </View>

      <JournalList
        journals={allJournals}
        onJournalPress={handleJournalPress}
        onCreatePress={handleCreateJournal}
      />
      <AppFAB icon={Plus} onPress={handleCreateJournal} style={styles.fab} />
    </AppScreen>
  );
}
