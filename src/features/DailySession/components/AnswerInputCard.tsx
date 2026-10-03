import { AppInput } from '@/components';

interface AnswerInputCardProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export function AnswerInputCard({
  value,
  onChangeText,
  placeholder = 'Type your answer here...',
}: AnswerInputCardProps) {
  return (
    <AppInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline
      showCharacterCount
      className="w-full"
      inputClassName=" px-2 pt-4 text-md text-text border-border"
      containerClassName="border-border"
    />
  );
}
