import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { CircleHelp, Clock3, Sprout, Star } from 'lucide-react-native';
import { useCallback, useMemo } from 'react';

import { ConversationRole } from '@/__generated__/graphql';
import { View } from 'react-native';
import { selectTodayQuestion } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface TodaysFocusCardProps {
  title?: string;
  duration?: string;
  questionCount?: string;
  purpose?: string;
  outcome?: string;
  onWhyPress?: () => void;
}

export function TodaysFocusCard({
  duration = '10-15 min',
  questionCount = '4-5',
  purpose = 'Reflection',
  outcome = 'Clarity',
  onWhyPress,
}: TodaysFocusCardProps) {
  const { data: todayQuestion } = useSelector(selectTodayQuestion);

  const getTodayFocusContent = useCallback(() => {
    const lastItem = [...(todayQuestion?.conversation ?? [])]
      .reverse()
      .find(item => item.role === ConversationRole.Assistant);
    return lastItem?.insight ?? lastItem?.content ?? lastItem?.question ?? '';
  }, [todayQuestion]);

  const todayFocusContent = useMemo(() => {
    return getTodayFocusContent();
  }, [getTodayFocusContent]);

  return (
    <AppCard className="overflow-hidden rounded-[24px] border border-border bg-card p-5">
      {/* Header */}
      <View className="flex-row items-start">
        {/* Focus Icon */}
        <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/20">
          <View className="h-8 w-8 items-center justify-center rounded-full border-2 border-primary">
            <View className="h-5 w-5 items-center justify-center rounded-full border-2 border-primary">
              <View className="h-2 w-2 rounded-full bg-primary" />
            </View>
          </View>
        </View>

        {/* Focus Content */}
        <View className="ml-4 flex-1">
          <AppText variant="lg" className="font-medium text-primary">
            Today's Focus
          </AppText>

          <AppText variant="md" className="mt-1 text-text">
            {todayFocusContent}
          </AppText>
        </View>

        {/* Why Focus */}
        <AppPressable
          onPress={onWhyPress}
          className="ml-3 flex-row items-start rounded-full"
        >
          <AppIcon icon={CircleHelp} size={28} className="text-primary" />
        </AppPressable>
      </View>

      {/* Stats */}
      <View className="mt-4 flex-row items-start justify-between">
        {/* Time */}
        <FocusStat
          icon={<AppIcon icon={Clock3} size={24} className="text-primary" />}
          iconClassName="border border-primary"
          label="Time"
          value={duration}
        />

        {/* Questions */}
        <FocusStat
          icon={
            <AppIcon icon={CircleHelp} size={24} className="text-primary" />
          }
          iconClassName="bg-purple-500/10"
          label="Questions"
          value={questionCount}
        />

        {/* Purpose */}
        <FocusStat
          icon={<AppIcon icon={Star} size={24} className="text-primary" />}
          iconClassName="bg-amber-500/10"
          label="Purpose"
          value={purpose}
        />

        {/* Outcome */}
        <FocusStat
          icon={<AppIcon icon={Sprout} size={24} className="text-primary" />}
          iconClassName="bg-emerald-500/10"
          label="Outcome"
          value={outcome}
        />
      </View>
    </AppCard>
  );
}

interface FocusStatProps {
  icon: React.ReactNode;
  iconClassName: string;
  label: string;
  value: string;
}

function FocusStat({ icon, label, value }: FocusStatProps) {
  return (
    <View className="flex-1 items-center">
      {icon}

      <AppText variant="sm" className="mt-2 text-center font-medium text-text">
        {label}
      </AppText>

      <AppText variant="xs" className="mt-1 text-center text-text-muted">
        {value}
      </AppText>
    </View>
  );
}
