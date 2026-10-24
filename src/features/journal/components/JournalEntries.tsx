import { AppCard, AppContentLoader, AppIcon, AppText } from '@/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';

import { ChevronRight } from 'lucide-react-native';
import { JournalEntryCard } from './JournalEntryCard';
import { JournalStackParamList } from '@/features/journal/navigation';
import React from 'react';
import { selectRecentJournalEntries } from '@/state/selectors/api/recentJournalEntries';
import { useSelector } from 'react-redux';

interface JournalEntriesProps {}

export function JournalEntries({}: JournalEntriesProps) {
  const { data: recentJournalEntries, loading } = useSelector(
    selectRecentJournalEntries,
  );

  const navigation = useNavigation<NavigationProp<JournalStackParamList>>();

  return (
    <View className="">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <AppText variant="lg" className=" text-text">
          Your Journal Entries
        </AppText>

        <AppCard className="bg-transparent py-4 pr-0">
          <View className="flex-row items-center">
            <Pressable
              onPress={() => {
                navigation.navigate('JournalHistory');
              }}
            >
              <AppText variant="lg" className="text-primary">
                View all
              </AppText>
            </Pressable>

            <AppIcon
              icon={ChevronRight}
              size={18}
              strokeWidth={2.5}
              className="text-primary"
            />
          </View>
        </AppCard>
      </View>

      {/* Entries */}
      {loading ? (
        <AppContentLoader />
      ) : (
        <>
          {recentJournalEntries?.map(entry => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))}
        </>
      )}
    </View>
  );
}
