import { Bell, Menu } from 'lucide-react-native';
import { Image, View } from 'react-native';

import { AppIcon } from '@/components/foundation/AppIcon';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import { HeaderSectionProps } from './types';
import React from 'react';
import { styles } from './styles';

export function HeaderSection({
  userName,
  greeting = 'Good Morning',
  subtitle = 'Every day you choose you is a day towards a better you. 💜',
  avatarUrl,
  onAvatarPress,
  onMenuPress,
  onNotificationPress,
}: HeaderSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.navigationRow}>
        <AppPressable onPress={onMenuPress}>
          <AppIcon icon={Menu} size={18} strokeWidth={2.2} />
        </AppPressable>

        <AppPressable
          style={[styles.iconButton, styles.notificationButton]}
          onPress={onNotificationPress}
        >
          <View>
            <AppIcon icon={Bell} size={18} strokeWidth={2.2} />
            <View style={styles.notificationDot} />
          </View>
        </AppPressable>
      </View>

      <View style={styles.greetingRow}>
        <View style={styles.greetingContainer}>
          <AppText variant="titleLargeBold" style={styles.title}>
            {greeting}, {userName} 👋
          </AppText>

          <AppText
            variant="bodySmall"
            color="textSecondary"
            style={styles.subtitle}
          >
            {subtitle}
          </AppText>
        </View>

        <AppPressable onPress={onAvatarPress}>
          <Image
            source={
              avatarUrl
                ? { uri: avatarUrl }
                : require('@/assets/images/avatar.png')
            }
            style={styles.avatar}
          />
        </AppPressable>
      </View>
    </View>
  );
}
