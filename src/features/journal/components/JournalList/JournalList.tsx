import { ListRenderItem, SectionList, View } from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';

import { AppText } from '@/components/foundation/AppText';
import { EmptyJournal } from '../EmptyJournal';
import { Journal } from '../../types';
import { JournalCard } from '../JournalCard';
import { JournalListProps } from './types';
import { groupJournalsByDate } from '../../utils/groupJournalsByDate';
import { styles } from './styles';

export const JournalList = memo(
  ({ journals, style, onJournalPress, onCreatePress }: JournalListProps) => {
    const renderItem = useCallback<ListRenderItem<Journal>>(
      ({ item }) => <JournalCard journal={item} onPress={onJournalPress} />,
      [onJournalPress],
    );

    const keyExtractor = useCallback((item: Journal) => item.id, []);

    const sections = useMemo(() => groupJournalsByDate(journals), [journals]);

    const ItemSeparator = useCallback(
      () => <View style={styles.separator} />,
      [],
    );

    return (
      <SectionList
        style={[styles.section, style]}
        stickySectionHeadersEnabled={false}
        sections={sections}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={<EmptyJournal onCreatePress={onCreatePress} />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
          <AppText variant="bodyBold" style={styles.sectionContainer}>
            {section.title}
          </AppText>
        )}
      />
    );
  },
);
