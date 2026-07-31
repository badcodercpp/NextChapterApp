import { ArrowRight, Sparkles } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AppIcon } from '@/components/foundation/AppIcon';
import { AppText } from '@/components/foundation/AppText';
import { MountainIllustration } from './components/MountainIllustration';
import React from 'react';
import { TodayInsightBackground } from './components/TodayInsightBackground';
import { TodayInsightSectionProps } from './types';
import { styles } from './styles';

export function TodayInsightSection({
  insight,
  onPress,
}: TodayInsightSectionProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <TodayInsightBackground />

      <View style={styles.content}>
        <View style={styles.left}>
          <View style={styles.badgeRow}>
            <AppIcon size={14} color="primary" icon={Sparkles} />

            <AppText variant="bodySmall" style={styles.badge}>
              {insight.title}
            </AppText>
          </View>

          <AppText variant="bodySmallBold" style={styles.title}>
            {insight.description}
          </AppText>

          <View style={styles.footer}>
            <AppText variant="body" style={styles.action}>
              View insight
            </AppText>

            <AppIcon icon={ArrowRight} size={16} color="primary" />
          </View>
        </View>

        <View style={styles.illustrationContainer}>
          <MountainIllustration />
        </View>
      </View>
    </Pressable>
  );
}
