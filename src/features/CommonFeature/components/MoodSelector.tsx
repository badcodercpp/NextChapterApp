import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { ChevronDown, ChevronUp, Heart } from 'lucide-react-native';
import React, { useState } from 'react';

import { MoodSelectorProps } from '../types/moods';
import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';
import { View } from 'react-native';
import { defaultMoodSelectorOptions } from '../constants/moods';

export function MoodSelector({
  title = 'Your overall Mood',
  subtitle = "How are you feeling after today's session?",
  options = defaultMoodSelectorOptions,
  collapsedCount = 3,
}: MoodSelectorProps) {
  const [value, setValue] = useState<
    Array<RecoveryReasonCurrentFeeling | undefined>
  >([]);
  const [expanded, setExpanded] = useState(false);

  const visibleOptions = expanded ? options : options.slice(0, collapsedCount);

  const canExpand = options.length > collapsedCount;

  return (
    <AppCard className="rounded-[24px] border border-border bg-card p-5">
      {/* Header */}
      <View className="flex-row items-center">
        <AppIcon icon={Heart} size={24} className="text-primary" />

        <AppText variant="xl" className="ml-4 text-primary">
          {title}
        </AppText>
      </View>

      {/* Subtitle */}
      <AppText variant="lg" className="mt-2 text-text">
        {subtitle}
      </AppText>

      {/* Mood options */}
      <View className="mt-4 flex-row flex-wrap gap-1">
        {visibleOptions.map(option => {
          const selected = value.includes(option.value);

          return (
            <AppPressable
              key={option.value}
              onPress={() => {
                const target = Array.from(new Set([...value]));
                if (target.includes(option.value)) {
                  setValue(target.filter(e => e !== option.value));
                } else {
                  setValue(v => Array.from(new Set([...v, option.value])));
                }
              }}
              className={`
                min-w-[92px]
                flex-1
                basis-[30%]
                items-center
                justify-center
                rounded-[34px]
                border
                p-4
                ${
                  selected
                    ? 'border-border bg-primary'
                    : 'border-border bg-surface'
                }
              `}
            >
              <AppText variant="4xl">{option.emoji}</AppText>

              <AppText
                variant="md"
                className={`mt-2 text-center ${
                  selected ? 'text-text' : 'text-primary'
                }`}
              >
                {option.label}
              </AppText>
            </AppPressable>
          );
        })}
      </View>

      {/* Show more / less */}
      {canExpand && (
        <AppPressable
          onPress={() => setExpanded(current => !current)}
          className="mt-5 flex-row items-center justify-center"
        >
          <AppText variant="sm" className="font-medium text-primary">
            {expanded ? 'Show less' : 'Show more'}
          </AppText>

          {expanded ? (
            <AppIcon icon={ChevronUp} size={18} className="mt-1 text-primary" />
          ) : (
            <AppIcon
              icon={ChevronDown}
              size={18}
              className="mt-1 text-primary"
            />
          )}
        </AppPressable>
      )}
    </AppCard>
  );
}
