import { AppCard, AppIcon, AppPressable, AppText } from '@/components';

import { Lightbulb } from 'lucide-react-native';
import { View } from 'react-native';

interface AnswerStarterCardProps {
  options?: string[];
  onSelect?: (option: string) => void;
}

const defaultOptions = [
  'A specific memory',
  'A conversation',
  'A person',
  'A moment in time',
];

export function AnswerStarterCard({
  options = defaultOptions,
  onSelect,
}: AnswerStarterCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[24px] border border-border bg-card p-5">
      {/* Header */}
      <View className="flex-row items-start">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/15">
          <AppIcon icon={Lightbulb} size={20} className="text-primary" />
        </View>

        <View className="ml-4 flex-1">
          <AppText variant="lg" className="font-semibold text-text">
            Not sure where to start?
          </AppText>

          <AppText variant="md" className="mt-1 text-text-muted">
            Here are some thoughts to help you reflect.
          </AppText>
        </View>
      </View>

      {/* Options */}
      <View className="mt-5 flex-row flex-wrap gap-3">
        {options.map(option => (
          <AppPressable
            key={option}
            onPress={() => onSelect?.(option)}
            className="rounded-full border border-primary bg-primary/5 px-3 py-2"
          >
            <AppText variant="sm" className="font-medium text-primary">
              {option}
            </AppText>
          </AppPressable>
        ))}
      </View>
    </AppCard>
  );
}
