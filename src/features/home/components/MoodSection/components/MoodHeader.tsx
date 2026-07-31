import { Pressable, View } from 'react-native';

import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { styles } from '../styles';

interface Props {
  onEdit?: () => void;
}

export function MoodHeader({ onEdit }: Props) {
  return (
    <View style={styles.header}>
      <AppText variant="bodySmallBold" style={styles.title}>
        How are you feeling right now?
      </AppText>

      <Pressable hitSlop={10} onPress={onEdit}>
        <AppText variant="bodySmall" style={styles.edit}>
          Edit
        </AppText>
      </Pressable>
    </View>
  );
}
