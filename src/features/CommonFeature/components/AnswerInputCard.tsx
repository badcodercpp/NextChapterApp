import { AppInput, AppInputProps } from '@/components';

interface AnswerInputCardProps extends AppInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export function AnswerInputCard({
  value,
  onChangeText,
  placeholder = 'Type your answer here...',
  inputClassName,
  containerClassName,
  ...rest
}: AnswerInputCardProps) {
  return (
    <AppInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline
      showCharacterCount
      className="w-full"
      inputClassName={`px-2 pt-4 text-md text-text border-border ${inputClassName}`}
      containerClassName={`border-border ${containerClassName}`}
      {...rest}
    />
  );
}
