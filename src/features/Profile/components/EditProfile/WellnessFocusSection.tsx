import { AppIcon, AppPressable, AppText } from '@/components';
import { Check, CirclePlus, Save, Trash2 } from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';

interface WellnessFocusSectionProps {
  selectedFocusAreas: string[];
  focusAreas?: string[];

  onFocusAreaToggle: (focusArea: string) => void;
  onAddFocusArea?: () => void;
  onSave?: () => void;
  onDeleteAccount?: () => void;

  saving?: boolean;
}

const DEFAULT_FOCUS_AREAS = [
  'Anxiety',
  'Mindfulness',
  'Self-esteem',
  'Sleep',
  'Grief',
  'Relationships',
];

export function WellnessFocusSection({
  selectedFocusAreas,
  focusAreas = DEFAULT_FOCUS_AREAS,
  onFocusAreaToggle,
  onAddFocusArea,
  onSave,
  onDeleteAccount,
  saving = false,
}: WellnessFocusSectionProps) {
  return (
    <View className="w-full">
      {/* Section Header */}
      <View className="mt-2 mb-2 flex-row items-center">
        <View className="mr-3 h-7 w-1.5 rounded-full bg-primary" />

        <AppText
          variant="sm"
          className="font-semibold uppercase tracking-[2px] text-text-muted"
        >
          Wellness Focus
        </AppText>
      </View>

      {/* Focus Areas */}
      <View>
        <View className="flex-row flex-wrap gap-2">
          {focusAreas.map(focusArea => {
            const isSelected = selectedFocusAreas.includes(focusArea);

            return (
              <AppPressable
                key={focusArea}
                onPress={() => onFocusAreaToggle(focusArea)}
                className={cn(
                  'py-2 flex-row items-center rounded-full px-5',
                  'border',
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-white/10 bg-white/[0.04]',
                )}
                accessibilityRole="button"
                accessibilityState={{
                  selected: isSelected,
                }}
              >
                {isSelected && (
                  <AppIcon
                    icon={Check}
                    size={17}
                    className="mr-2 text-primary"
                    strokeWidth={3}
                  />
                )}

                <AppText
                  variant="md"
                  className={cn(
                    'font-semibold',
                    isSelected ? 'text-primary' : 'text-text-muted',
                  )}
                >
                  {focusArea}
                </AppText>
              </AppPressable>
            );
          })}

          {/* Add Focus Area */}
          {onAddFocusArea && (
            <AppPressable
              onPress={onAddFocusArea}
              className={cn(
                'h-[47px] flex-row items-center rounded-full px-5',
                'border border-dashed border-white/20',
                'bg-white/[0.02]',
              )}
            >
              <AppIcon
                icon={CirclePlus}
                size={18}
                className="mr-2 text-text-muted"
              />

              <AppText variant="md" className="font-semibold text-text-muted">
                Add
              </AppText>
            </AppPressable>
          )}
        </View>
      </View>

      {/* Save Changes */}
      {onSave && (
        <AppPressable
          onPress={onSave}
          disabled={saving}
          className={cn(
            'mt-4 py-3 w-full flex-row items-center justify-center',
            'rounded-[24px]',
            'bg-primary',
            saving && 'opacity-60',
          )}
        >
          <AppIcon
            icon={Save}
            size={27}
            className="mr-3 text-white"
            strokeWidth={2.5}
          />

          <AppText variant="xl" className="font-semibold text-white">
            {saving ? 'Saving...' : 'Save Changes'}
          </AppText>
        </AppPressable>
      )}

      {/* Danger Zone */}
      {onDeleteAccount && (
        <View
          className={cn(
            'mt-4 rounded-[27px]',
            'border border-red-400/20',
            'bg-red-500/[0.04]',
            'p-4',
          )}
        >
          <AppText variant="lg" className="mb-2 font-semibold text-red-400">
            Danger Zone
          </AppText>

          <AppPressable
            onPress={onDeleteAccount}
            className="flex-row items-center"
          >
            <AppIcon
              icon={Trash2}
              size={24}
              className="mr-4 text-red-400"
              strokeWidth={2.3}
            />

            <AppText variant="sm" className="font-semibold text-red-400">
              Delete my account
            </AppText>
          </AppPressable>
        </View>
      )}
    </View>
  );
}
