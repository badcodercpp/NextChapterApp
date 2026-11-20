import { AppButton, AppInput, AppInputProps } from '@/components';
import { ChevronRight, Save, Send } from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';

import { MasterFormData } from '@/form/types';

interface AnswerInputCardProps extends AppInputProps {
  placeholder?: string;
  maxLength?: number;
  showSaveButton?: boolean;
  onSaveAnswerPress?: () => void;
  onEndIconPress?: () => void;
}

export function TodaysQuestionAnswerInputCard({
  placeholder = 'Type your answer here...',
  inputClassName,
  containerClassName,
  showSaveButton = false,
  onSaveAnswerPress,
  onEndIconPress,
  ...rest
}: AnswerInputCardProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext<MasterFormData>();
  return (
    <Controller
      control={control}
      name="todaysQuestionAnswer.answer"
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <AppInput
            accessibilityLabel="Anwer Input"
            keyboardType="default"
            disabled={false}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.todaysQuestionAnswer?.answer?.message}
            onFocus={() => clearErrors('todaysQuestionAnswer.answer')}
            placeholder={placeholder}
            multiline
            className="w-full"
            endIcon={Send}
            endIconDisabled
            endIconClassName="text-link-v2"
            endIconSize={24}
            onEndIconPress={onEndIconPress}
            inputClassName={`px-2 pt-4 text-md text-text border-border ${inputClassName}`}
            containerClassName={`border-border ${containerClassName}`}
            {...rest}
          />
          {showSaveButton && (
            <AppButton
              title="Continue Daily Session"
              size="lg"
              leftIcon={Save}
              fullWidth
              className="mb-0"
              onPress={onSaveAnswerPress}
              rightIcon={ChevronRight}
            />
          )}
        </>
      )}
    />
  );
}
