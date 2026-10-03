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
  Compass,
  Pencil,
  Smile,
  Sprout,
  Target,
} from 'lucide-react-native';
import React, { useState } from 'react';

import { View } from 'react-native';

export interface ReflectionData {
  realization?: string;
  feeling?: string;
  need?: string;
  action?: string;
}

interface ReflectionPromptsProps {
  reflection?: ReflectionData;
  onChange?: (key: keyof ReflectionData, value: string) => void;
}

const prompts: {
  key: keyof ReflectionData;
  title: string;
  description: string;
  icon: typeof Smile;
}[] = [
  {
    key: 'realization',
    title: 'What did you learn about yourself today?',
    description: 'Your thoughts, feelings, or patterns.',
    icon: Smile,
  },
  {
    key: 'feeling',
    title: 'What felt meaningful or helpful?',
    description: 'Moments, insights, or realizations.',
    icon: Sprout,
  },
  {
    key: 'need',
    title: 'What was challenging for you?',
    description: 'Anything that was hard to face or accept.',
    icon: Compass,
  },
  {
    key: 'action',
    title: 'What will you carry forward?',
    description: 'One intention or reminder for tomorrow.',
    icon: Target,
  },
];

export function ReflectionPrompts({
  reflection,
  onChange,
}: ReflectionPromptsProps) {
  const [editingKey, setEditingKey] = useState<keyof ReflectionData | null>(
    null,
  );

  const [expandedKey, setExpandedKey] = useState<keyof ReflectionData | null>(
    null,
  );

  const [draftValue, setDraftValue] = useState('');

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
    <AppCard className="overflow-hidden rounded-[28px] border border-border bg-card p-4 shadow-none">
      <View>
        {/* Header */}
        <View className="mb-3 flex-row items-center">
          <AppIcon icon={ClipboardList} size={24} className="text-primary" />

          <AppText variant="xl" className="ml-2 text-primary">
            Today's Reflection
          </AppText>
        </View>

        {/* Four BE reflection points */}
        <View className="gap-4">
          {prompts.map(prompt => {
            const Icon = prompt.icon;
            const value = reflection?.[prompt.key] ?? '';

            const isEditing = editingKey === prompt.key;
            const isExpanded = expandedKey === prompt.key;

            return (
              <AppCard
                key={prompt.key}
                className="overflow-hidden rounded-[28px] border border-border bg-card p-0 shadow-none"
              >
                {/* Prompt */}
                <AppPressable
                  disabled={isEditing}
                  onPress={() => handleToggle(prompt.key)}
                  className="p-4"
                >
                  <View className="flex-row items-center">
                    {/* Icon */}
                    <View className="h-10 w-10 items-center justify-center rounded-full border border-primary">
                      <AppIcon icon={Icon} size={24} className="text-primary" />
                    </View>

                    {/* Text */}
                    <View className="ml-6 flex-1 pr-3">
                      <AppText variant="lg" className=" text-text">
                        {prompt.title}
                      </AppText>

                      <AppText variant="md" className="mt-1 text-text-muted">
                        {prompt.description}
                      </AppText>
                    </View>

                    {/* Chevron */}
                    {!isEditing &&
                      (isExpanded ? (
                        <AppIcon
                          icon={ChevronUp}
                          size={24}
                          className="text-primary"
                        />
                      ) : (
                        <AppIcon
                          icon={ChevronDown}
                          size={24}
                          className="text-primary"
                        />
                      ))}
                  </View>
                </AppPressable>

                {/* Generated reflection */}
                {isExpanded && (
                  <View className="border-t border-border px-7 pb-6 pt-5">
                    {!isEditing ? (
                      <View>
                        <View className="flex-row items-start justify-between">
                          <View className="flex-1 pr-4">
                            <AppText variant="sm" className=" text-primary">
                              Your reflection
                            </AppText>

                            <AppText variant="md" className="mt-2 text-text">
                              {value || 'No reflection yet.'}
                            </AppText>
                          </View>

                          <AppPressable
                            onPress={() => handleEdit(prompt.key)}
                            className="h-9 w-9 items-center justify-center rounded-full bg-transparent"
                          >
                            <AppIcon
                              icon={Pencil}
                              size={16}
                              className="text-primary"
                            />
                          </AppPressable>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <AppText variant="sm" className="mb-3 text-primary">
                          Your reflection
                        </AppText>

                        <AppInput
                          value={draftValue}
                          onChangeText={setDraftValue}
                          multiline
                          className="w-full"
                          inputClassName="min-h-[140px] px-4 pt-4 text-base text-text"
                        />

                        <View className="mt-4 flex-row justify-end">
                          <AppPressable
                            onPress={handleCancel}
                            className="mr-3 rounded-full border border-border px-5 py-2.5"
                          >
                            <AppText variant="sm" className=" text-text">
                              Cancel
                            </AppText>
                          </AppPressable>

                          <AppPressable
                            onPress={() => handleSave(prompt.key)}
                            className="flex-row items-center rounded-full bg-primary px-5 py-2.5"
                          >
                            <AppIcon
                              icon={Check}
                              size={16}
                              className="text-text"
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
