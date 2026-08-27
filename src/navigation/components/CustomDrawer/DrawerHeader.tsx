import { AppAvatar } from '@/components/foundation/AppAvatar';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export function DrawerHeader() {
  return (
    <View style={styles.header}>
      <AppAvatar size="xl" name="Ajay Jha" />

      <AppText variant="xl" style={styles.greeting}>
        Good Evening 👋
      </AppText>

      <AppText variant="xl" style={styles.name}>
        Ajay Jha
      </AppText>

      <AppText variant="md" style={styles.subtitle}>
        Keep growing one day at a time 🌱
      </AppText>
    </View>
  );
}
