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

  const progress = currentIndex <= 0 ? 0 : currentIndex / (steps.length - 1);

  return (
    <View className="w-full">
      {/* Progress bar */}
      <View className="relative h-2 overflow-hidden rounded-full bg-border">
        <View
          className="absolute left-0 top-0 h-full rounded-full bg-primary"
          style={{
            width: `${Math.max(progress * 100, 20)}%`,
          }}
        />
      </View>

      {/* Steps */}
      <View className="mt-5 flex-row justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isActive = index <= currentIndex;

          return (
            <View key={step.key} className="flex-1 items-center">
              {/* Circle */}
              <View
                className={[
                  'h-12 w-12 items-center justify-center rounded-full border-2',
                  isCurrent || isCompleted
                    ? 'border-primary bg-primary'
                    : 'border-border bg-surface',
                ].join(' ')}
              >
                {isCompleted ? (
                  <AppIcon icon={Check} size={22} className="text-text" />
                ) : (
                  <AppText
                    variant="md"
                    className={
                      isCurrent
                        ? 'font-semibold text-white'
                        : 'font-medium text-text-muted'
                    }
                  >
                    {index + 1}
                  </AppText>
                )}
              </View>

              {/* Label */}
              <AppText
                variant="sm"
                className={[
                  'mt-2 text-center',
                  isActive ? 'text-primary' : 'text-text-muted',
                ].join(' ')}
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
