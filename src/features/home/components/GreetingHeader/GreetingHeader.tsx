import { AppText } from '@/components/foundation/AppText';
import { GreetingHeaderProps } from './types';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export function GreetingHeader({
  greeting,
  name,
  emoji = '👋',
  style,
}: GreetingHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <AppText variant="body" color="textSecondary" style={styles.greeting}>
        {greeting}
      </AppText>

      <AppText variant="display">
        {name} {emoji}
      </AppText>
    </View>
  );
}
