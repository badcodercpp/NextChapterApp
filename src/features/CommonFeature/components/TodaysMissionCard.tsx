import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { Check, Shield } from 'lucide-react-native';
import { lazySelectTodayMission, selectActiveJourney } from '@/state/selectors';

import { View } from 'react-native';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface TodaysMissionCardProps {
  completed?: number;
  total?: number;
  onPress?: () => void;
  showProgress?: boolean;
}

export function TodaysMissionCard({
  completed = 0,
  total = 1,
  onPress,
  showProgress = true,
}: TodaysMissionCardProps) {
  const { data: activeJourney } = useSelector(selectActiveJourney);

  const progress = total > 0 ? completed / total : 0;
  const isCompleted = completed >= total;

  const todayMissionSelector = useMemo(() => {
    return lazySelectTodayMission(
      activeJourney?.id ?? '',
      activeJourney?.currentDay ?? 1,
    );
  }, [activeJourney]);

  const { data: todayMission } = useSelector(todayMissionSelector);

  const missionTitle = todayMission?.title?.replace(/^Day\s+\d+:\s*/, '');

  const { t } = useTranslation();

  const title = t('app.locale.common.mission.noContact.title');

  const description = t('app.locale.common.mission.noContact.description');

  return (
    <AppCard className="rounded-[28px] border-1 border-border bg-card p-5">
      <View className="flex-row">
        {/* Content */}
        <View className="flex-1 pr-4">
          <AppText
            variant="sm"
            className="font-medium uppercase tracking-wide text-primary"
          >
            {t('app.locale.common.mission.todayMission.title')}
          </AppText>

          <AppText variant="xl" className="mt-2 font-semibold text-text">
            {missionTitle ?? title}
          </AppText>

          <AppText variant="md" className="mt-1 text-text-secondary">
            {todayMission?.description ?? description}
          </AppText>

          {/* Progress */}
          {showProgress && (
            <View className="mt-4 flex-row items-center">
              <AppPressable
                onPress={onPress}
                disabled={!onPress}
                className="h-6 w-6 items-center justify-center rounded-full bg-primary"
              >
                <AppIcon
                  icon={Check}
                  size={12}
                  className="text-white"
                  strokeWidth={3}
                />
              </AppPressable>

              <View className="mx-3 flex-1">
                <View className="h-2 overflow-hidden rounded-full bg-primary/20">
                  <View
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.min(progress, 1) * 100}%`,
                    }}
                  />
                </View>
              </View>

              <AppText variant="sm" className="text-text-secondary">
                {completed}/{total}{' '}
                {isCompleted
                  ? t('app.locale.common.completed')
                  : t('app.locale.common.completed')}
              </AppText>
            </View>
          )}
        </View>

        {/* Mission Icon */}
        <View className="h-10 w-10 items-center justify-center  rounded-full bg-primary/15">
          <AppIcon
            icon={Shield}
            size={24}
            className="text-primary"
            strokeWidth={2}
          />
        </View>
      </View>
    </AppCard>
  );
}
