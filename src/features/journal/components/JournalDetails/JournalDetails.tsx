import { ArrowLeft, Dot, Share2, Star } from 'lucide-react-native';
import { formatJournalMeta, getJournalPresentation } from './helpers';

import { AppButton } from '@/components/foundation/AppButton';
import { AppIcon } from '@/components/foundation/AppIcon';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import { CategoryBadge } from '../CategoryBadge';
import { Colors } from '@/theme/colors';
import { MoodChip } from '../MoodChip';
import React from 'react';
import { Scene } from '@/components/foundation/SceneIllustration/scenes';
import { ScenePaletteConfig } from '@/components/foundation/SceneIllustration/scenes/ScenePaletteConfig';
import { View } from 'react-native';
import { journalDetailsMock } from './mock';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export function JournalDetails() {
  /**
   * Later:
   *
   * const { journalId } = route.params;
   * const { data } = useJournal(journalId);
   * const journal = mapJournal(data);
   */

  const presentation = getJournalPresentation(journalDetailsMock.mood);
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Scene
            variant={presentation.scene}
            palette={ScenePaletteConfig.sad}
          />

          <View style={styles.header}>
            <AppPressable
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
            >
              <AppIcon icon={ArrowLeft} size={20} />
            </AppPressable>

            <View style={styles.headerActions}>
              <AppPressable style={styles.iconButton} onPress={() => {}}>
                <AppIcon icon={Share2} size={18} />
              </AppPressable>

              <AppPressable style={styles.iconButton} onPress={() => {}}>
                <AppIcon
                  icon={Star}
                  size={18}
                  fill={
                    journalDetailsMock.bookmarked
                      ? Colors.primary
                      : 'transparent'
                  }
                  color="primary"
                />
              </AppPressable>
            </View>
          </View>
        </View>

        <View style={styles.sheet}>
          <View style={styles.moodChipContainer}>
            <MoodChip mood={journalDetailsMock.mood} showLabel={false} />
          </View>
          <View style={styles.moodRow}>
            <View style={styles.titleContainer}>
              <AppText variant="titleLargeBold" style={styles.title}>
                {journalDetailsMock.title}
              </AppText>

              <View style={styles.titleRow}>
                <CategoryBadge category={journalDetailsMock.category} />
                <View style={styles.dotContainer}>
                  <AppIcon icon={Dot} color="textSecondary" />
                </View>
                <AppText variant="bodySmall" style={styles.meta}>
                  {formatJournalMeta(journalDetailsMock.createdAt)}
                </AppText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <AppText variant="bodyLarge">{journalDetailsMock.content}</AppText>
          </View>

          <View style={styles.actions}>
            <AppButton
              title="Share"
              variant="outline"
              style={styles.actionButton}
              onPress={() => {}}
            />

            <AppButton
              title="Edit"
              style={styles.actionButton}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
