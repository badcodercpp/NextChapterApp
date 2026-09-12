import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { View } from 'react-native';

interface Props {
  onLogout: () => void;
}

export function DrawerFooter({}: Props) {
  return (
    <View className="mt-auto pt-5 pb-6">
      <AppText variant="xl" className="text-center mt-5">
        Version 1.0.0
      </AppText>
    </View>
  );
}
