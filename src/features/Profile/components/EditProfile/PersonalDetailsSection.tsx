import { AppInput, AppPressable, AppText } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { Calendar } from 'lucide-react-native';
import { Gender } from '@/__generated__/graphql';
import { MasterFormData } from '@/form/types';
import { cn } from '@/utils';

interface PersonalDetailsSectionProps {}

const GENDER_OPTIONS: {
  value: Gender;
  label: string;
}[] = [
  {
    value: Gender.Female,
    label: 'Female',
  },
  {
    value: Gender.Male,
    label: 'Male',
  },
  {
    value: Gender.Other,
    label: 'Other',
  },
];

export function PersonalDetailsSection({}: PersonalDetailsSectionProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext<MasterFormData>();

  return (
    <View className="w-full">
      {/* Section Header */}
      <View className="mt-2 mb-4 flex-row items-center">
        <View className="mr-3 h-7 w-1.5 rounded-full bg-primary" />

        <AppText
          variant="sm"
          className="font-semibold uppercase tracking-[2px] text-text-muted"
        >
          Personal Details
        </AppText>
      </View>

      {/* Gender */}
      <View className="mb-6">
        <AppText variant="sm" className="mb-1 px-2 text-text">
          Gender
        </AppText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-none"
          contentContainerClassName="flex-row gap-3"
        >
          <Controller
            control={control}
            name="updateProfile.gender"
            render={({ field: { value, onChange } }) => (
              <>
                {GENDER_OPTIONS.map(option => {
                  const isSelected = option.value === value;

                  return (
                    <AppPressable
                      key={option.value}
                      onPress={() => onChange(option.value)}
                      className={cn(
                        'min-w-[120px] px-5 py-3 items-center justify-center rounded-[25px]',
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
              </>
            )}
          />
        </ScrollView>
      </View>

      {/* Date of Birth */}
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Date of Birth
      </AppText>

      <Controller
        control={control}
        name="updateProfile.dob"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            placeholder="Enter your date of birth"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.updateProfile?.dob?.message}
            onFocus={() => {
              clearErrors('updateProfile.dob');
            }}
            startIcon={Calendar}
            inputClassName="text-text-secondary"
            className="mb-4"
          />
        )}
      />
    </View>
  );
}
