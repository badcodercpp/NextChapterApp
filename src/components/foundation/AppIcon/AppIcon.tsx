import { AppIconProps } from './types';
import { AppText } from '../AppText';
import React from 'react';
import { View } from 'react-native'; // Imported View and Text
import { cn } from '@/utils';
import { withUniwind } from 'uniwind';

export function AppIcon({
  icon: Icon,
  size = 24,
  strokeWidth = 2,
  className = 'text-text',
  count,
  maxCount = 9,
}: AppIconProps) {
  const UniwindIcon = withUniwind(Icon);

  // Determine what text to show inside the badge
  const displayCount =
    count !== undefined && count > maxCount ? `${maxCount}+` : count;

  return (
    <View className="relative inline-flex items-center justify-center">
      {/* The Core Icon Component */}
      <UniwindIcon
        size={size}
        strokeWidth={strokeWidth}
        className={cn(className)}
      />

      {/* Conditional Badge Rendering */}
      {count !== undefined && count > 0 && (
        <View className="absolute -top-2 -right-2 bg-error rounded-full flex items-center justify-center px-1 min-w-[24px] min-h-[20px] pointer-events-none">
          <View className="flex-1">
            <View className="flex-1 items-center justify-center">
              <AppText variant="xs" className=" text-text">
                {displayCount}
              </AppText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
