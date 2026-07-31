import React, { useCallback } from 'react';

import { AppCard } from '@/components/foundation/AppCard';
import { AppIcon } from '@/components/foundation/AppIcon';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import { CategoryBadge } from '../CategoryBadge';
import { JournalCardConfig } from './constants';
import { JournalCardProps } from './types';
import { MoodChip } from '../MoodChip';
import { Star } from 'lucide-react-native';
import { Theme } from '@/theme';
import { View } from 'react-native';
import { formatJournalDateTime } from './helpers';
import { styles } from './styles';

export function JournalCard({ journal, style, onPress }: JournalCardProps) {
  const handlePress = useCallback(() => {
    onPress?.(journal);
  }, [journal, onPress]);

  return (
    <AppPressable style={[styles.container, style]} onPress={handlePress}>
      <AppCard style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MoodChip
              mood={journal.mood}
              selected={false}
              showLabel={false}
              size="small"
            />

            <View style={styles.title}>
              <AppText
                variant="titleSmall"
                numberOfLines={JournalCardConfig.titleNumberOfLines}
              >
                {journal.title}
              </AppText>
            </View>
          </View>

          <AppIcon
            icon={Star}
            size={
              journal.isFavorite
                ? JournalCardConfig.favoriteIconSize + 2
                : JournalCardConfig.favoriteIconSize
            }
            fill={journal.isFavorite ? Theme.colors.primary : undefined}
            strokeWidth={journal.isFavorite ? 0 : 2}
          />
        </View>

        <View style={styles.preview}>
          <AppText
            variant="body"
            color="textSecondary"
            numberOfLines={JournalCardConfig.previewNumberOfLines}
          >
            {journal.content}
          </AppText>
        </View>

        <View style={styles.footer}>
          <CategoryBadge category={journal.category} />

          <AppText variant="label" color="textSecondary">
            {formatJournalDateTime(journal.createdAt)}
          </AppText>
        </View>
      </AppCard>
    </AppPressable>
  );
}
