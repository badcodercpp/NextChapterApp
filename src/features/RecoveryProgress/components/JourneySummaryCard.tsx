import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Heart,
  MessageCircle,
} from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';
import { selectApplicationConfig } from '@/state/selectors';
import { useSelector } from 'react-redux';

type JourneyStat = {
  id: string;
  value: number;
  label: string;
  icon: typeof MessageCircle;
  iconColorClassName: string;
  iconBackgroundClassName: string;
};

interface JourneySummaryCardProps {
  currentDay: number;
  totalDays?: number;

  daysActive: number;
  tasksCompleted: number;
  journalEntries: number;
  reflections: number;

  onPress?: () => void;
  className?: string;
}

const JOURNEY_STATS = (
  daysActive: number,
  tasksCompleted: number,
  journalEntries: number,
  reflections: number,
): JourneyStat[] => [
  {
    id: 'days-active',
    value: daysActive,
    label: 'Days Active',
    icon: MessageCircle,
    iconColorClassName: 'text-primary',
    iconBackgroundClassName: 'bg-primary/15',
  },
  {
    id: 'tasks-completed',
    value: tasksCompleted,
    label: 'Tasks\nCompleted',
    icon: CheckCircle,
    iconColorClassName: 'text-teal-400',
    iconBackgroundClassName: 'bg-teal-400/15',
  },
  {
    id: 'journal-entries',
    value: journalEntries,
    label: 'Journal Entries',
    icon: BookOpen,
    iconColorClassName: 'text-cyan-400',
    iconBackgroundClassName: 'bg-cyan-400/15',
  },
  {
    id: 'reflections',
    value: reflections,
    label: 'Reflections',
    icon: Heart,
    iconColorClassName: 'text-pink-400',
    iconBackgroundClassName: 'bg-pink-400/15',
  },
];

export function JourneySummaryCard({
  currentDay,
  daysActive,
  tasksCompleted,
  journalEntries,
  reflections,
  onPress,
  className,
}: JourneySummaryCardProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);

  const stats = JOURNEY_STATS(
    daysActive,
    tasksCompleted,
    journalEntries,
    reflections,
  );

  const content = (
    <>
      {/* Header */}
      <View className="mb-6 flex-row items-start justify-between">
        <AppText variant="xl" className="font-semibold text-text max-w-[160px]">
          Your Journey Summary
        </AppText>

        <View className="flex-row items-center">
          <AppText variant="lg" className="font-semibold text-primary">
            Day {currentDay} of {applicationConfig?.totalProgramDays}
          </AppText>

          <AppIcon
            icon={ChevronRight}
            size={24}
            className="ml-1 text-primary"
            strokeWidth={2.8}
          />
        </View>
      </View>

      {/* Stats */}
      <View className="flex-row gap-3">
        {stats.map(stat => (
          <View
            key={stat.id}
            className="
              flex-1
              items-center
              rounded-[24px]
              border
              border-border
              p-2
            "
          >
            {/* Icon */}
            <View
              className={cn(
                'h-10 w-10 items-center justify-center rounded-full',
                stat.iconBackgroundClassName,
              )}
            >
              <AppIcon
                icon={stat.icon}
                size={16}
                className={stat.iconColorClassName}
                strokeWidth={2.4}
              />
            </View>

            {/* Value */}
            <AppText
              variant="md"
              className="mt-4 font-semibold leading-none text-white"
            >
              {stat.value}
            </AppText>

            {/* Label */}
            <AppText
              variant="md"
              className="mt-4 text-center leading-6 text-text-muted"
            >
              {stat.label}
            </AppText>
          </View>
        ))}
      </View>
    </>
  );

  if (onPress) {
    return (
      <AppPressable onPress={onPress} className={cn('w-full', className)}>
        <AppCard
          className="
            rounded-[24px]
            border
            border-border
            bg-surface
            p-4
          "
        >
          {content}
        </AppCard>
      </AppPressable>
    );
  }

  return (
    <AppCard
      className={cn(
        'w-full rounded-[24px]',
        'border border-border',
        'bg-surface',
        'p-4',
        className,
      )}
    >
      {content}
    </AppCard>
  );
}
