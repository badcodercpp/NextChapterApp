import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { Check, Shield } from 'lucide-react-native';

import { View } from 'react-native';
import { selectTodayMission } from '@/state/selectors';
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
  const progress = total > 0 ? completed / total : 0;
  const isCompleted = completed >= total;

  const { data: todayMission } = useSelector(selectTodayMission);

  const missionTitle = todayMission?.title?.replace(/^Day\s+\d+:\s*/, '');

  const { t } = useTranslation();

  const title = t('app.locale.common.mission.noContact.title');

  const description = t('app.locale.common.mission.noContact.description');

  return (
    <AppCard className="rounded-[28px] border border-border-v2 bg-surface-v2 p-5">
      <View className="flex-row items-center">
        <View className="flex-1 pr-4">
          <AppText
            variant="sm"
            className="font-bold uppercase tracking-wide text-primary-v2"
          >
            {t('app.locale.common.mission.todayMission.title')}
          </AppText>

          <AppText variant="xl" className="mt-2 font-semibold text-text-v2">
            {missionTitle ?? title}
          </AppText>

          <AppText variant="md" className="mt-1 leading-6 text-text-muted-v2">
            {todayMission?.description ?? description}
          </AppText>
        </View>

        <View className="h-20 w-20 items-center justify-center rounded-full bg-primary-v2/15">
          <AppIcon
            icon={Shield}
            size={34}
            className="text-primary-v2"
            strokeWidth={2}
          />
        </View>
      </View>

      {showProgress && (
        <View className="mt-4 flex-row items-center">
          <AppPressable
            onPress={onPress}
            disabled={!onPress}
            className="h-7 w-7 items-center justify-center rounded-full bg-primary-v2"
          >
            <AppIcon
              icon={Check}
              size={14}
              className="text-on-primary-v2"
              strokeWidth={3}
            />
          </AppPressable>

          <View className="mx-3 flex-1">
            <View className="h-2 overflow-hidden rounded-full bg-primary-v2/20">
              <View
                className="h-full rounded-full bg-primary-v2"
                style={{
                  width: `${Math.min(progress, 1) * 100}%`,
                }}
              />
            </View>
          </View>

          <AppText variant="sm" className="text-text-muted-v2">
            {completed}/{total}{' '}
            {isCompleted
              ? t('app.locale.common.completed')
              : t('app.locale.common.completed')}
          </AppText>
        </View>
      )}
    </AppCard>
  );
}
