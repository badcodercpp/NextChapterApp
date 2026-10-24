import { AppIcon, AppText } from '@/components';
import { Pressable, View } from 'react-native';

import React from 'react';
import { Search } from 'lucide-react-native';

interface JournalHeaderProps {
  onSearchPress?: () => void;
  enableSearch?: boolean;
  title?: string;
  description?: string;
}

export function JournalHeader({
  onSearchPress,
  enableSearch = false,
  title,
  description,
}: JournalHeaderProps) {
  return (
    <View className="bg-background">
      <View className="flex-row items-center justify-between">
        {/* Title */}
        <View className="flex-1">
          <AppText className="text-2xl text-primary">
            {title ?? 'Journal'}
          </AppText>

          <AppText className="text-sm text-text-secondary">
            {description ?? 'Your safe space to heal and grow'}
          </AppText>
        </View>

        {/* Actions */}
        {enableSearch && (
          <View className="ml-4 flex-row gap-4">
            <Pressable
              onPress={onSearchPress}
              className="items-center justify-center "
            >
              <AppIcon icon={Search} size={28} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
