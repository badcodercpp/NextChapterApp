import { AppInput, AppPressable, AppText } from '@/components';
import { Calendar, MapPin } from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';

type Gender = 'female' | 'male' | 'other';

interface PersonalDetailsSectionProps {
  gender: Gender;
  dateOfBirth: string;
  location: string;

  onGenderChange: (gender: Gender) => void;
  onDateOfBirthPress?: () => void;
  onLocationPress?: () => void;
}

const GENDER_OPTIONS: {
  value: Gender;
  label: string;
}[] = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

export function PersonalDetailsSection({
  gender,
  dateOfBirth,
  location,
  onGenderChange,
  onDateOfBirthPress,
  onLocationPress,
}: PersonalDetailsSectionProps) {
  return (
    <View className="w-full">
      {/* Section Header */}
      <View className="mt-2 mb-2 flex-row items-center">
        <View className="mr-3 h-7 w-1.5 rounded-full bg-primary" />

        <AppText
          variant="sm"
          className="font-semibold uppercase tracking-[2px] text-text-muted"
        >
          Personal Details
        </AppText>
      </View>

      {/* Gender */}
      <View className="mb-4">
        <AppText variant="sm" className="mb-1 px-2 text-text">
          Gender
        </AppText>

        <View className="flex-row gap-2">
          {GENDER_OPTIONS.map(option => {
            const isSelected = gender === option.value;

            return (
              <AppPressable
                key={option.value}
                onPress={() => onGenderChange(option.value)}
                className={cn(
                  'py-2 flex-1 items-center justify-center rounded-[25px]',
                  'border',
                  isSelected
                    ? 'border-primary bg-primary/15'
                    : 'border-white/10 bg-white/[0.06]',
                )}
                accessibilityRole="button"
                accessibilityState={{
                  selected: isSelected,
                }}
              >
                <AppText
                  variant="lg"
                  className={cn(
                    'font-semibold',
                    isSelected ? 'text-primary' : 'text-text-muted',
                  )}
                >
                  {option.label}
                </AppText>
              </AppPressable>
            );
          })}
        </View>
      </View>

      {/* Date of Birth */}
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Date of Birth
      </AppText>
      <AppInput
        value={dateOfBirth}
        startIcon={Calendar}
        endIcon={Calendar}
        onEndIconPress={onDateOfBirthPress}
        className="mb-6"
        inputClassName="text-text-secondary"
      />

      {/* Location */}
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Location
      </AppText>
      <AppInput
        value={location}
        startIcon={MapPin}
        endIcon={MapPin}
        onEndIconPress={onLocationPress}
        inputClassName="text-text-secondary"
      />
    </View>
  );
}
