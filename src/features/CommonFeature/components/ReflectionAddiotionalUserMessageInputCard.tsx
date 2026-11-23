import { AppInput, AppInputProps } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';

import { MasterFormData } from '@/form/types';

interface ReflectionAddiotionalUserMessageInputCardProps extends AppInputProps {
  placeholder?: string;
  maxLength?: number;
  onEndIconPress?: () => void;
}

export function ReflectionAddiotionalUserMessageInputCard({}: ReflectionAddiotionalUserMessageInputCardProps) {
  const { control } = useFormContext<MasterFormData>();

  return (
    <Controller
      control={control}
      name="sessionReflection.userMessage"
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <AppInput
            variant="v2"
            value={value}
            onChangeText={onChange}
            placeholder="Write your thoughts here..."
            onBlur={onBlur}
            multiline
            showCharacterCount
            className="w-full"
            inputClassName="min-h-[88px] px-3 pt-3 text-md text-text-v2"
            containerClassName="rounded-[18px] border-primary-v2/25 bg-background-v2"
          />
        </>
      )}
    />
  );
}
