import {
  AppCard,
  AppIcon,
  AppInput,
  AppPressable,
  AppText,
} from '@/components';
import {
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Pencil,
} from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';
import React, { useState } from 'react';

import { MasterFormData } from '@/form/types';
import { ReflectionData } from '@/features/DailySession/types/types';
import { View } from 'react-native';
import { useDailySessionReflectionMetadata } from '@/features/DailySession/hooks/useDailySessionReflectionMetadata';

interface ReflectionPromptsProps {
  reflection?: ReflectionData;
  onChange?: (key: keyof ReflectionData, value: string) => void;
}

export function ReflectionPrompts({
  reflection,
  onChange,
}: ReflectionPromptsProps) {
  const { getReflectionPrompts } = useDailySessionReflectionMetadata();
  const [editingKey, setEditingKey] = useState<keyof ReflectionData | null>(
    null,
  );

  const [expandedKey, setExpandedKey] = useState<keyof ReflectionData | null>(
    null,
  );

  const [draftValue, setDraftValue] = useState('');

  const prompts = getReflectionPrompts();

  const {
    control,
    formState: { errors },
    getValues,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const handleEdit = (key: keyof ReflectionData) => {
    setDraftValue(reflection?.[key] ?? '');
    setEditingKey(key);
    setExpandedKey(key);
  };

  const handleCancel = () => {
    setDraftValue('');
    setEditingKey(null);
  };

  const handleSave = (key: keyof ReflectionData) => {
    onChange?.(key, draftValue.trim());
    setEditingKey(null);
  };

  const handleToggle = (key: keyof ReflectionData) => {
    if (editingKey === key) {
      return;
    }

    setExpandedKey(current => (current === key ? null : key));
  };

  return (
    <AppCard className="overflow-hidden rounded-[28px] border border-primary-v2/30 bg-background-v2 p-4 shadow-none">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View>
        {/* Header */}
        <View className="mb-3 flex-row items-center">
          <AppIcon icon={ClipboardList} size={26} className="text-link-v2" />

          <AppText variant="lg" className="ml-3 font-semibold text-link-v2">
            Today's Reflection
          </AppText>
        </View>

        {/* Four BE reflection points */}
        <View className="gap-2.5">
          {prompts.map(prompt => {
            const Icon = prompt.icon;

            const isEditing = editingKey === prompt.key;
            const isExpanded = expandedKey === prompt.key;

            return (
              <AppCard
                key={prompt.key}
                className="overflow-hidden rounded-[22px] border border-primary-v2/25 bg-background-v2/40 p-0 shadow-none"
              >
                {/* Prompt */}
                <AppPressable
                  disabled={isEditing}
                  onPress={() => handleToggle(prompt.key)}
                  className="p-3.5"
                >
                  <View className="flex-row items-center">
                    {/* Icon */}
                    <View className="h-11 w-11 items-center justify-center rounded-[14px] bg-primary-v2/20">
                      <AppIcon icon={Icon} size={27} className="text-link-v2" />
                    </View>

                    {/* Text */}
                    <View className="ml-3 flex-1 border-l border-primary-v2/30 pl-3 pr-2">
                      <AppText
                        variant="sm"
                        className="font-semibold leading-5 text-text-v2"
                      >
                        {prompt.title}
                      </AppText>

                      <AppText
                        variant="xs"
                        className="mt-1 leading-4 text-text-muted-v2"
                      >
                        {prompt.description}
                      </AppText>
                    </View>

                    {/* Chevron */}
                    {!isEditing &&
                      (isExpanded ? (
                        <AppIcon
                          icon={ChevronUp}
                          size={24}
                          className="text-link-v2"
                        />
                      ) : (
                        <AppIcon
                          icon={ChevronDown}
                          size={24}
                          className="text-link-v2"
                        />
                      ))}
                  </View>
                </AppPressable>

                {/* Generated reflection */}
                {isExpanded && (
                  <View className="border-t border-primary-v2/25 px-4 pb-4 pt-4">
                    {!isEditing ? (
                      <View>
                        <View className="flex-row items-start justify-between">
                          <View className="flex-1 pr-4">
                            <AppText variant="sm" className="text-link-v2">
                              Your reflection
                            </AppText>

                            <AppText variant="md" className="mt-2 text-text-v2">
                              {getValues(`sessionReflection.${prompt.key}`) ||
                                'No reflection yet.'}
                            </AppText>
                          </View>

                          <AppPressable
                            onPress={() => handleEdit(prompt.key)}
                            className="h-9 w-9 items-center justify-center rounded-full bg-transparent"
                          >
                            <AppIcon
                              icon={Pencil}
                              size={16}
                              className="text-link-v2"
                            />
                          </AppPressable>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <AppText variant="sm" className="mb-3 text-link-v2">
                          Your reflection
                        </AppText>
                        <Controller
                          control={control}
                          name={`sessionReflection.${prompt.key}`}
                          render={({
                            field: {
                              onChange: onKeyChange,
                              onBlur,
                              value: keyValue,
                            },
                          }) => (
                            <>
                              <AppInput
                                variant="v2"
                                value={keyValue}
                                onChangeText={onKeyChange}
                                onBlur={onBlur}
                                error={
                                  errors?.sessionReflection?.[prompt.key]
                                    ?.message
                                }
                                onFocus={() =>
                                  clearErrors(`sessionReflection.${prompt.key}`)
                                }
                                multiline
                                className="w-full"
                                inputClassName="min-h-[140px] px-4 pt-4 text-base text-text-v2"
                                containerClassName="rounded-[18px] border-primary-v2/30 bg-background-v2"
                              />
                            </>
                          )}
                        />

                        <View className="mt-4 flex-row justify-end">
                          <AppPressable
                            onPress={handleCancel}
                            className="mr-3 rounded-full border border-primary-v2/30 px-5 py-2.5"
                          >
                            <AppText variant="sm" className="text-text-v2">
                              Cancel
                            </AppText>
                          </AppPressable>

                          <AppPressable
                            onPress={() => handleSave(prompt.key)}
                            className="flex-row items-center rounded-full bg-primary-v2 px-5 py-2.5"
                          >
                            <AppIcon
                              icon={Check}
                              size={16}
                              className="text-on-primary-v2"
                            />

                            <AppText variant="sm" className="ml-1 text-white">
                              Save
                            </AppText>
                          </AppPressable>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </AppCard>
            );
          })}
        </View>
      </View>
    </AppCard>
  );
}
