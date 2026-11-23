import { AppInput, AppText } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';
import { Mail, Pencil, Phone } from 'lucide-react-native';

import { MasterFormData } from '@/form/types';
import { View } from 'react-native';
import { selectMe } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface ContactSectionProps {}

export function ContactSection({}: ContactSectionProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext<MasterFormData>();
  const { data: me } = useSelector(selectMe);

  return (
    <View className="w-full">
      {/* Section Header */}
      <View className="mb-4 flex-row items-center">
        <View className="mr-3 h-9 w-1.5 rounded-full bg-primary-v2" />

        <AppText
          variant="md"
          className="font-semibold uppercase tracking-[2.5px] text-text-muted-v2"
        >
          Contact
        </AppText>
      </View>

      {/* Mobile Number */}
      <AppText variant="md" className="mb-2 px-2 text-text-v2">
        Mobile Number
      </AppText>

      <Controller
        control={control}
        name="updateProfile.phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            placeholder="Enter your mobile number"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.updateProfile?.phone?.message}
            onFocus={() => {
              clearErrors('updateProfile.phone');
            }}
            startIcon={Phone}
            endIcon={Pencil}
            inputClassName="text-text-muted-v2"
            containerClassName="min-h-[64px] rounded-[24px] border-border-v2 bg-surface-v2/60 px-4"
            className="mb-6"
          />
        )}
      />

      {/* Email */}
      <AppText variant="md" className="mb-2 px-2 text-text-v2">
        Email Address
      </AppText>
      <AppInput
        value={me?.email}
        startIcon={Mail}
        disabled={true}
        inputClassName="text-text-muted-v2"
        containerClassName="min-h-[64px] rounded-[24px] border-border-v2 bg-surface-v2/60 px-4"
      />
    </View>
  );
}
