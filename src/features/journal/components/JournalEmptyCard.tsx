import { AppIcon, AppText } from '@/components';
import { Pressable, View } from 'react-native';

import { BookOpen } from 'lucide-react-native';
import React from 'react';

interface JournalEmptyCardProps {
  onPress?: () => void;
}

export function JournalEmptyCard({ onPress }: JournalEmptyCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <View className="relative p-4">
        {/* Book icon */}
        <View className="items-start">
          <AppIcon
            icon={BookOpen}
            size={34}
            strokeWidth={2.5}
            className="text-primary"
          />
        </View>

        {/* Text */}
        <View className="mt-1 max-w-[60%]">
          <AppText variant="xl" className="text-text">
            Write. Reflect. Heal.
          </AppText>

          <AppText variant="sm" className="mt-1  text-[#9CA5BE]">
            Your thoughts matters. Let it out, one step at a time.
          </AppText>
        </View>

        {/* Illustration */}
        <View className="absolute top-4 right-0 h-[145px] w-[145px]">
          {/* Open book */}
          <View className="absolute right-2 top-2 flex-row">
            <View className="h-[92px] w-[67px] rounded-tl-2xl rounded-bl-sm border-2 border-primary bg-surface">
              <View className="mt-6 ml-3 h-[2px] w-10 bg-primary" />
              <View className="mt-3 ml-3 h-[2px] w-10 bg-primary" />
              <View className="mt-3 ml-3 h-[2px] w-8 bg-primary" />
            </View>

            <View className="h-[92px] w-[67px] rounded-tr-2xl rounded-br-sm border-2 border-primary bg-surface">
              <View className="mt-6 ml-3 h-[2px] w-10 bg-primary" />
              <View className="mt-3 ml-3 h-[2px] w-10 bg-primary" />
              <View className="mt-3 ml-3 h-[2px] w-8 bg-primary" />
            </View>

            {/* Book spine */}
            <View className="absolute left-1/2 top-0 h-[94px] w-[2px] -translate-x-1/2 bg-primary" />

            {/* Purple bookmark */}
            <View className="absolute left-[46px] top-[12px] h-[44px] w-[10px] rotate-[-18deg] rounded-full bg-primary" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
