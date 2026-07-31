import { AppAvatar } from '@/components/foundation/AppAvatar';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export function DrawerHeader() {
  return (
    <View style={styles.header}>
      <AppAvatar size={72} name="Ajay Jha" />

      <AppText variant="bodySmallBold" style={styles.greeting}>
        Good Evening 👋
      </AppText>

      <AppText variant="titleLargeBold" style={styles.name}>
        Ajay Jha
      </AppText>

      <AppText variant="bodySmall" style={styles.subtitle}>
        Keep growing one day at a time 🌱
      </AppText>
    </View>
  );
}
