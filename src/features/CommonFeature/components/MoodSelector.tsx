import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { Check, ChevronDown, ChevronUp, Heart } from 'lucide-react-native';
import React, { useState } from 'react';

import { MoodSelectorProps } from '../types/moods';
import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';
import { View } from 'react-native';
import { defaultMoodSelectorOptions } from '../constants/moods';

export function MoodSelector({
  title = 'Your overall Mood',
  subtitle = "How are you feeling after today's session?",
  description,
  options = defaultMoodSelectorOptions,
  collapsedCount = 3,
  value,
  setValue,
  selectionMode = 'multiple',
  variant = 'default',
}: MoodSelectorProps) {
  const isJournal = variant === 'journal';
  const [isDirty, setIsDirty] = useState(false);
  const [localValue, setLocalValue] =
    useState<Array<RecoveryReasonCurrentFeeling | undefined>>(value);
  const [expanded, setExpanded] = useState(false);

  const visibleOptions = expanded ? options : options.slice(0, collapsedCount);

  const canExpand = options.length > collapsedCount;

  const handleSelect = (selectedValue: MoodSelectorProps['value'][number]) => {
    // Single selection → immediately update parent
    if (selectionMode === 'single') {
      setValue([selectedValue]);
      return;
    }

    // Multiple selection → only update local state
    setLocalValue(current => {
      setIsDirty(true);
      if (current.includes(selectedValue)) {
        return current.filter(item => item !== selectedValue);
      }

      return [...new Set([...current, selectedValue])];
    });
  };

  const syncLocalvalue = () => {
    setIsDirty(false);
    setValue(localValue);
  };

  return (
    <AppCard
      className={
        isJournal
          ? 'overflow-hidden rounded-[26px] border border-primary-v2/40 bg-background-v2 p-5'
          : 'rounded-[24px] border border-border bg-card p-4'
      }
    >
      {isJournal && (
        <>
          <View
            pointerEvents="none"
            className="absolute -right-8 -top-24 h-48 w-56 rounded-full bg-primary-v2/15"
          />
          <View
            pointerEvents="none"
            className="absolute -bottom-36 -right-20 h-48 w-64 rotate-[-25deg] rounded-full bg-primary-v2/10"
          />
        </>
      )}
      {/* Header */}
      <View className="flex-row items-center">
        <View
          className={
            isJournal
              ? 'mr-3 h-10 w-10 items-center justify-center rounded-xl border border-primary-v2/40 bg-primary-v2/20'
              : ''
          }
        >
          <AppIcon
            icon={Heart}
            size={24}
            className={isJournal ? 'text-link-v2' : 'text-primary'}
          />
        </View>

        <AppText
          variant="xl"
          className={
            isJournal
              ? 'flex-1 font-semibold text-primary-v2'
              : 'ml-2 text-primary'
          }
        >
          {title}
        </AppText>

        {isDirty && (
          <View className="flex-row items-end justify-end flex-1">
            <AppPressable
              onPress={syncLocalvalue}
              className="h-10 w-10 items-center justify-center rounded-full border border-primary"
            >
              <AppIcon icon={Check} size={24} className="text-primary" />
            </AppPressable>
          </View>
        )}
      </View>

      {/* Subtitle */}
      <AppText
        variant="lg"
        className={
          isJournal ? 'mt-3 font-semibold text-text-v2' : 'mt-2 text-text'
        }
      >
        {subtitle}
      </AppText>
      {description && (
        <AppText variant="sm" className="mt-2 text-text-muted-v2">
          {description}
        </AppText>
      )}

      {/* Mood options */}
      <View
        className={
          isJournal
            ? 'mt-5 flex-row flex-wrap gap-2.5'
            : 'mt-4 flex-row flex-wrap gap-1'
        }
      >
        {visibleOptions.map(option => {
          const selected = (
            selectionMode === 'single' ? value : localValue
          ).includes(option.value);

          return (
            <AppPressable
              key={option.value}
              accessibilityRole="button"
              accessibilityLabel={option.label}
              accessibilityState={{ selected }}
              onPress={() => handleSelect(option.value)}
              className={
                isJournal
                  ? `min-w-[80px] flex-1 basis-[28%] items-center justify-center rounded-[20px] border py-4 px-1 ${
                      selected
                        ? 'border-primary-v2 bg-primary-v2/20'
                        : 'border-border-v2 bg-surface-v2/40'
                    }`
                  : `
                min-w-[92px]
                flex-1
                basis-[30%]
                items-center
                justify-center
                rounded-3xl
                border
                p-4
                ${
                  selected
                    ? 'border-border bg-primary'
                    : 'border-border bg-surface'
                }
              `
              }
            >
              {isJournal && selected && (
                <View className="absolute -right-1 -top-1 h-6 w-6 items-center justify-center rounded-full border border-link-v2 bg-primary-v2">
                  <AppIcon
                    icon={Check}
                    size={15}
                    className="text-on-primary-v2"
                    strokeWidth={3}
                  />
                </View>
              )}
              <AppText variant="4xl">{option.emoji}</AppText>

              <AppText
                variant={isJournal ? 'sm' : 'md'}
                numberOfLines={isJournal ? 1 : undefined}
                adjustsFontSizeToFit={isJournal}
                minimumFontScale={0.8}
                className={
                  isJournal
                    ? `mt-2 w-full text-center ${
                        selected
                          ? 'font-semibold text-text-v2'
                          : 'text-text-muted-v2'
                      }`
                    : `
                  mt-2
                  text-center
                  ${selected ? 'text-text' : 'text-primary'}
                `
                }
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
          className={
            isJournal
              ? 'mt-5 self-center flex-row items-center justify-center rounded-full border border-primary-v2/50 bg-primary-v2/15 px-5 py-2.5'
              : 'mt-5 flex-row items-center justify-center'
          }
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
