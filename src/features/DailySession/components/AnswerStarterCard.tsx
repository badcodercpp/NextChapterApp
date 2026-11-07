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
    <AppCard className="overflow-hidden rounded-[22px] border border-primary-v2/30 bg-background-v2 p-3.5">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View className="flex-row items-center">
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-primary-v2/20">
          <AppIcon icon={Lightbulb} size={22} className="text-link-v2" />
        </View>

        <View className="ml-3 flex-1 border-l border-primary-v2/30 pl-3">
          <AppText variant="md" className="font-semibold text-text-v2">
            Not sure where to start?
          </AppText>

          <AppText variant="xs" className="mt-1 leading-4 text-text-muted-v2">
            Here are some thoughts to help you reflect.
          </AppText>
        </View>
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {options.map(option => (
          <AppPressable
            key={option}
            onPress={() => onSelect?.(option)}
            className="rounded-full border border-primary-v2/30 bg-primary-v2/10 px-3 py-2"
          >
            <AppText variant="sm" className="font-medium text-link-v2">
              {option}
            </AppText>
          </AppPressable>
        ))}
      </View>
    </AppCard>
  );
}
