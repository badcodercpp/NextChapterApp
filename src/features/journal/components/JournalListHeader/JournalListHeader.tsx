import { Image, View } from 'react-native';

import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import { JournalListHeaderProps } from './types';
import React from 'react';
import { Theme } from '@/theme';
import { styles } from './styles';

export const JournalListHeader = ({
  title = 'Journal',
  subtitle = 'Your thoughts, memories and reflections',
  avatar = { uri: 'https://picsum.photos/200' },
  onAvatarPress,
}: JournalListHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText
          variant="titleLargeBold"
          style={[
            styles.title,
            {
              color: Theme.colors.text,
            },
          ]}
        >
          {title}
        </AppText>

        <AppText
          variant="caption"
          style={[
            styles.subtitle,
            {
              color: Theme.colors.textSecondary,
            },
          ]}
        >
          {subtitle}
        </AppText>
      </View>

      {avatar && (
        <AppPressable style={styles.avatarContainer} onPress={onAvatarPress}>
          <Image source={avatar} style={styles.avatar} />
        </AppPressable>
      )}
    </View>
  );
};
