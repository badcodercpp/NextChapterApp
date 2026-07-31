import { AppEmptyStateProps } from './types';
import { AppText } from '../AppText';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export function AppEmptyState({
  image,
  title,
  description,
  action,
  style,
}: AppEmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      {image && <View style={styles.image}>{image}</View>}

      <AppText variant="titleLargeBold" style={styles.title}>
        {title}
      </AppText>

      {description && (
        <AppText
          variant="body"
          color="textSecondary"
          style={styles.description}
        >
          {description}
        </AppText>
      )}

      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
}
