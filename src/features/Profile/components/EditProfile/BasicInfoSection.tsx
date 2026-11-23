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
      <View className="mb-4 flex-row items-center">
        <View className="mr-3 h-9 w-1.5 rounded-full bg-primary-v2" />

        <AppText
          variant="md"
          className="font-semibold uppercase tracking-[2.5px] text-text-muted-v2"
        >
          Basic Info
        </AppText>
      </View>

      {/* Full Name */}
      <AppText variant="md" className="mb-2 px-2 text-text-v2">
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
            inputClassName="text-text-muted-v2"
            containerClassName="min-h-[64px] rounded-[24px] border-border-v2 bg-surface-v2/60 px-4"
            className="mb-6"
          />
        )}
      />

      {/* Bio */}
      <AppText variant="md" className="mb-2 px-2 text-text-v2">
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
            inputClassName="text-text-muted-v2"
            containerClassName="min-h-[160px] items-start rounded-[24px] border-border-v2 bg-surface-v2/60 px-4"
            className="mb-2"
          />
        )}
      />
    </View>
  );
}
