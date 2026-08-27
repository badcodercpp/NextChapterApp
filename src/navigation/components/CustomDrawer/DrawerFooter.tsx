import { Pressable, View } from 'react-native';

import { AppText } from '@/components/foundation/AppText';
import { LOGOUT_ITEM } from './constants';
import React from 'react';
import { styles } from './styles';

interface Props {
  onLogout: () => void;
}

export function DrawerFooter({ onLogout }: Props) {
  const Icon = LOGOUT_ITEM.icon;

  return (
    <View style={styles.footer}>
      <Pressable
        onPress={onLogout}
        style={styles.item}
        android_ripple={
          {
            // color: Theme.colors.primaryLight,
          }
        }
      >
        <View style={styles.iconContainer}>
          <Icon
            width={22}
            height={22}
            // color={Theme.colors.error}
          />
        </View>

        <AppText
          style={[
            styles.label,
            {
              // color: Theme.colors.error,
            },
          ]}
        >
          Logout
        </AppText>
      </Pressable>

      <AppText variant="xl" style={styles.version}>
        Version 1.0.0
      </AppText>
    </View>
  );
}
