import { AppInput, AppText } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';
import { FileText, Pencil, UserRound } from 'lucide-react-native';

import { MasterFormData } from '@/form/types';
import { View } from 'react-native';

interface BasicInfoSectionProps {}

export function BasicInfoSection({}: BasicInfoSectionProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext<MasterFormData>();

  return (
    <View className="w-full">
      {/* Section Header */}
      <View className="mb-2 flex-row items-center">
        <View className="mr-3 h-7 w-1.5 rounded-full bg-primary" />

        <AppText
          variant="sm"
          className="font-semibold uppercase tracking-[2px] text-text-muted"
        >
          Basic Info
        </AppText>
      </View>

      {/* Full Name */}
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Full Name
      </AppText>
      <Controller
        control={control}
        name="updateProfile.displayName"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            placeholder="Enter your full name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.updateProfile?.displayName?.message}
            onFocus={() => {
              clearErrors('updateProfile.displayName');
            }}
            startIcon={UserRound}
            endIcon={Pencil}
            inputClassName="text-text-secondary"
            className="mb-4"
          />
        )}
      />

      {/* Bio */}
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Bio
      </AppText>
      <Controller
        control={control}
        name="updateProfile.bio"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            placeholder="Enter your bio"
            multiline
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.updateProfile?.bio?.message}
            onFocus={() => {
              clearErrors('updateProfile.bio');
            }}
            startIcon={FileText}
            endIcon={Pencil}
            inputClassName="text-text-secondary"
            className="mb-4"
          />
        )}
      />
    </View>
  );
}
