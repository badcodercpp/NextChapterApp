import { AppExpandableText, AppText } from '@/components';

import { AppNumberedListProps } from './types';
import React from 'react';
import { View } from 'react-native';

export function AppNumberedList({
  items,
  className = '',
  itemClassName = '',
  numberClassName = '',
  titleClassName = '',
  descriptionClassName = '',
}: AppNumberedListProps) {
  return (
    <View className={className}>
      {items.map((item, index) => (
        <View
          key={`${item.title}-${index}`}
          className={`mb-5 flex-row ${itemClassName}`}
        >
          {index < items.length - 1 && (
            <View className="absolute left-5 top-10 bottom-[-20px] w-px bg-primary/30" />
          )}
          {/* Number */}
          <View
            className={`h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10 ${numberClassName}`}
          >
            <AppText variant="md" className="font-semibold text-primary">
              {index + 1}
            </AppText>
          </View>

          {/* Content */}
          <View className="ml-4 flex-1">
            <AppText
              variant="lg"
              className={`font-semibold text-white ${titleClassName}`}
            >
              {item.title}
            </AppText>

            {item.description && (
              <AppExpandableText
                text={item.description}
                collapsedLines={2}
                variant="md"
                textClassName={`mt-1 text-text-secondary ${descriptionClassName}`}
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
