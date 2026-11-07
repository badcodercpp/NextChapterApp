import { AppIcon, AppText } from '@/components';

import { Check } from 'lucide-react-native';
import { View } from 'react-native';

export type SessionProgressStep =
  | 'QUESTION'
  | 'FOLLOW_UPS'
  | 'MISSION'
  | 'REFLECTION'
  | 'COMPLETED';

interface SessionProgressProps {
  currentStep: SessionProgressStep;
}

const steps = [
  {
    key: 'QUESTION',
    label: 'Question',
  },
  {
    key: 'FOLLOW_UPS',
    label: 'Follow-ups',
  },
  {
    key: 'MISSION',
    label: 'Mission',
  },
  {
    key: 'REFLECTION',
    label: 'Reflect',
  },
  {
    key: 'COMPLETED',
    label: 'Complete',
  },
] as const;

export function SessionProgress({ currentStep }: SessionProgressProps) {
  const currentIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <View className="w-full px-1">
      <View className="flex-row justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isActive = index <= currentIndex;

          return (
            <View
              key={step.key}
              className="min-h-[64px] flex-1 items-center pt-1"
              accessible
              accessibilityState={{ selected: isCurrent }}
              accessibilityLabel={`${step.label}${
                isCurrent ? ', current step' : isCompleted ? ', completed' : ''
              }`}
            >
              {index < steps.length - 1 && (
                <View
                  pointerEvents="none"
                  className={`absolute left-1/2 top-[22px] h-0.5 w-full ${
                    index < currentIndex ? 'bg-primary-v2/70' : 'bg-border-v2'
                  }`}
                />
              )}
              <View
                className={[
                  'h-9 w-9 items-center justify-center rounded-full border-2',
                  isCurrent
                    ? 'border-link-v2 bg-primary-v2'
                    : isCompleted
                    ? 'border-primary-v2 bg-primary-v2'
                    : 'border-border-v2 bg-background-v2',
                ].join(' ')}
              >
                {isCompleted ? (
                  <AppIcon
                    icon={Check}
                    size={16}
                    className="text-on-primary-v2"
                  />
                ) : (
                  <AppText
                    variant="xs"
                    className={
                      isCurrent
                        ? 'font-semibold text-on-primary-v2'
                        : 'font-medium text-text-muted-v2'
                    }
                  >
                    {index + 1}
                  </AppText>
                )}
              </View>

              <AppText
                variant="xs"
                className={[
                  'mt-2 text-center',
                  isCurrent
                    ? 'font-semibold text-text-v2'
                    : isActive
                    ? 'text-link-v2'
                    : 'text-text-muted-v2',
                ].join(' ')}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {step.label}
              </AppText>
            </View>
          );
        })}
      </View>
    </View>
  );
}
