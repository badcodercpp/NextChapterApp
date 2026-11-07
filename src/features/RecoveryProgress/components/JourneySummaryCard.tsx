import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Heart,
  MessageCircle,
} from 'lucide-react-native';
import {
  selectActiveJourney,
  selectApplicationConfig,
} from '@/state/selectors';

import { View } from 'react-native';
import { cn } from '@/utils';
import { useSelector } from 'react-redux';
import { useResolveClassNames } from 'uniwind';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

type JourneyStat = {
  id: string;
  value: number;
  label: string;
  icon: typeof MessageCircle;
  iconColorClassName: string;
  iconBackgroundClassName: string;
};

interface JourneySummaryCardProps {
  totalDays?: number;

  onPress?: () => void;
  className?: string;
}

export function JourneySummaryCard({
  onPress,
  className,
}: JourneySummaryCardProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const { data: activeJourney } = useSelector(selectActiveJourney);
  const { backgroundColor: background } =
    useResolveClassNames('bg-background-v2');
  const { backgroundColor: accent } = useResolveClassNames('bg-primary-v2');

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
      iconColorClassName: 'text-link-v2',
      iconBackgroundClassName: 'bg-primary-v2/15',
    },
    {
      id: 'tasks-completed',
      value: tasksCompleted,
      label: 'Tasks Completed',
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
      iconColorClassName: 'text-link-v2',
      iconBackgroundClassName: 'bg-primary-v2/15',
    },
  ];

  const stats = JOURNEY_STATS(activeJourney?.currentDay ?? 1, 10, 5, 3);

  const content = (
    <>
      <View pointerEvents="none" className="absolute inset-0">
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient
              id="journeySummaryBackground"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <Stop offset="0" stopColor={accent} stopOpacity={0.2} />
              <Stop offset="0.5" stopColor={background} stopOpacity={0.1} />
              <Stop offset="1" stopColor={accent} stopOpacity={0.12} />
            </LinearGradient>
          </Defs>
          <Rect
            width="100%"
            height="100%"
            fill="url(#journeySummaryBackground)"
          />
        </Svg>
      </View>
      <View
        pointerEvents="none"
        className="absolute -right-20 -top-28 h-56 w-56 rounded-full bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-32 -left-20 h-48 w-64 rounded-full bg-primary-v2/5"
      />
      {/* Header */}
      <View className="mb-4">
        <AppText variant="lg" className="font-bold text-text-v2">
          Your Journey Summary
        </AppText>

        <View className="mt-1 flex-row items-center">
          <AppText variant="sm" className="font-medium text-link-v2">
            Day {activeJourney?.currentDay} of{' '}
            {applicationConfig?.totalProgramDays}
          </AppText>

          {onPress && (
            <AppIcon
              icon={ChevronRight}
              size={24}
              className="ml-1 text-link-v2"
              strokeWidth={2.8}
            />
          )}
        </View>
      </View>

      {/* Stats */}
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {stats.map(stat => (
          <View
            key={stat.id}
            className="w-[48%] flex-row items-center rounded-[20px] border border-primary-v2/20 bg-background-v2/60 p-3"
          >
            {/* Icon */}
            <View
              className={cn(
                'h-10 w-10 shrink-0 items-center justify-center rounded-[14px]',
                stat.iconBackgroundClassName,
              )}
            >
              <AppIcon
                icon={stat.icon}
                size={22}
                className={stat.iconColorClassName}
                strokeWidth={2.4}
              />
            </View>

            {/* Value */}
            <View className="ml-3 flex-1">
              <AppText variant="xl" className="font-bold text-text-v2">
                {stat.value}
              </AppText>

              {/* Label */}
              <AppText
                variant="xs"
                className="mt-1 leading-4 text-text-muted-v2"
              >
                {stat.label}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  if (onPress) {
    return (
      <AppPressable onPress={onPress} className={cn('w-full', className)}>
        <AppCard className="overflow-hidden rounded-[26px] border border-primary-v2/30 bg-background-v2 p-4">
          {content}
        </AppCard>
      </AppPressable>
    );
  }

  return (
    <AppCard
      className={cn(
        'w-full overflow-hidden rounded-[26px]',
        'border border-primary-v2/30',
        'bg-background-v2',
        'p-4',
        className,
      )}
    >
      {content}
    </AppCard>
  );
}
