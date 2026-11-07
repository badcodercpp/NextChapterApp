import { AppContentLoader, AppIcon, AppText } from '@/components';
import {
  JournalRoutes,
  JournalStackParamList,
} from '@/features/journal/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';

import { BookOpen, ChevronRight } from 'lucide-react-native';
import { JournalEntryCard } from './JournalEntryCard';
import React from 'react';
import { selectRecentJournalEntries } from '@/state/selectors/api/recentJournalEntries';
import { useSelector } from 'react-redux';

interface JournalEntriesProps {
  origin: keyof typeof JournalRoutes;
}

export function JournalEntries({ origin }: JournalEntriesProps) {
  const { data: recentJournalEntries, loading } = useSelector(
    selectRecentJournalEntries,
  );

  const navigation = useNavigation<NavigationProp<JournalStackParamList>>();

  return (
    <View className="">
      {/* Header */}
      <View className="mb-4 mt-5 flex-row items-center justify-between gap-2">
        <View className="flex-1 flex-row items-center">
          <AppIcon icon={BookOpen} size={24} className="mr-2 text-link-v2" />
          <AppText variant="lg" className="flex-1 font-semibold text-text-v2">
            Your Journal Entries
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('JournalHistory')}
          className="flex-row items-center rounded-full border border-primary-v2/30 bg-primary-v2/5 px-3 py-2"
        >
          <AppText variant="sm" className="font-semibold text-link-v2">
            View all
          </AppText>
          <AppIcon
            icon={ChevronRight}
            size={17}
            className="ml-1 text-link-v2"
          />
        </Pressable>
      </View>

      {/* Entries */}
      {loading ? (
        <AppContentLoader />
      ) : (
        <>
          {recentJournalEntries?.map(entry => (
            <JournalEntryCard key={entry.id} entry={entry} origin={origin} />
          ))}
        </>
      )}
    </View>
  );
}
