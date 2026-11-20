import { AppInput, AppInputProps } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';

import { MasterFormData } from '@/form/types';
import { Send } from 'lucide-react-native';

interface TodaysFollowUpInputCardProps extends AppInputProps {
  placeholder?: string;
  maxLength?: number;
  onEndIconPress?: () => void;
}

export function TodaysFollowUpInputCard({
  placeholder = 'Type your answer here...',
  inputClassName,
  containerClassName,
  onEndIconPress,
  ...rest
}: TodaysFollowUpInputCardProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext<MasterFormData>();
  return (
    <Controller
      control={control}
      name="todaysQuestionFollowup.answer"
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <AppInput
            accessibilityLabel="Anwer Input"
            keyboardType="default"
            disabled={false}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.todaysQuestionFollowup?.answer?.message}
            onFocus={() => clearErrors('todaysQuestionFollowup.answer')}
            placeholder={placeholder}
            multiline
            className="w-full"
            variant="v2"
            showCharacterCount
            endIcon={Send}
            endIconDisabled
            endIconClassName="text-link-v2"
            endIconSize={24}
            onEndIconPress={onEndIconPress}
            inputClassName={`min-h-[104px] px-3 pt-4 text-md text-text-v2 ${inputClassName}`}
            containerClassName={`rounded-[24px] border-primary-v2/40 bg-selected-v2/40 ${containerClassName}`}
            {...rest}
          />
        </>
      )}
    />
  );
}
