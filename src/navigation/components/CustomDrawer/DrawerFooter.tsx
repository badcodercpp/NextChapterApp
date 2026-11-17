import { AppIcon } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import { ChevronRight, Info, LogOut } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

interface Props {
  onLogout: () => void;
}

export function DrawerFooter({ onLogout }: Props) {
  return (
    <View>
      <Pressable
        onPress={onLogout}
        accessibilityRole="button"
        accessibilityLabel="Log Out"
        className="mx-4 flex-row items-center rounded-2xl border border-primary/25 bg-primary/10 p-2"
      >
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
          <AppIcon icon={LogOut} size={22} className="text-red-400" />
        </View>
        <AppText variant="lg" className="ml-3 flex-1">
          Log Out
        </AppText>
        <View className="pr-1">
          <AppIcon icon={ChevronRight} size={18} className="text-text" />
        </View>
      </Pressable>

      <View className="mx-6 mt-3 flex-row items-center justify-center border-t border-primary/25 pt-3">
        <AppIcon icon={Info} size={16} className="text-text-secondary" />
        <AppText variant="sm" className="ml-2 text-text-secondary">
          Version 1.0.0
        </AppText>
      </View>
    </View>
  );
}
