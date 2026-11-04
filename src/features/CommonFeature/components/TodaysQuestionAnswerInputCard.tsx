import { AppInput, AppInputProps } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';

import { MasterFormData } from '@/form/types';

interface AnswerInputCardProps extends AppInputProps {
  placeholder?: string;
  maxLength?: number;
}

export function TodaysQuestionAnswerInputCard({
  placeholder = 'Type your answer here...',
  inputClassName,
  containerClassName,
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
          inputClassName={`px-2 pt-4 text-md text-text border-border ${inputClassName}`}
          containerClassName={`border-border ${containerClassName}`}
          {...rest}
        />
      )}
    />
  );
}
