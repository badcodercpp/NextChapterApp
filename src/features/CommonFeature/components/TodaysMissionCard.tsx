import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { Check, Shield, Target } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import { View } from 'react-native';
import { selectTodayMission } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useResolveClassNames } from 'uniwind';

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
  const { backgroundColor: accentColor } =
    useResolveClassNames('bg-primary-v2');

  const missionTitle = todayMission?.title?.replace(/^Day\s+\d+:\s*/, '');

  const { t } = useTranslation();

  const title = t('app.locale.common.mission.noContact.title');

  const description = t('app.locale.common.mission.noContact.description');

  return (
    <AppCard className="overflow-hidden rounded-[28px] border border-primary-v2/40 bg-background-v2 p-5">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute bottom-0 right-0 h-20 w-48"
      >
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 200 80"
          preserveAspectRatio="none"
        >
          <Path
            d="M0 80 Q70 20 130 50 Q160 65 200 10 V80Z"
            fill={accentColor}
            opacity={0.12}
          />
          <Path
            d="M85 80 Q125 60 145 30 Q165 5 200 0 V80Z"
            fill={accentColor}
            opacity={0.16}
          />
        </Svg>
      </View>
      <View className="self-start flex-row items-center rounded-full bg-primary-v2/20 px-3 py-2">
        <AppIcon icon={Target} size={20} className="mr-2 text-link-v2" />
        <AppText
          variant="sm"
          className="shrink font-bold uppercase tracking-wide text-link-v2"
        >
          {t('app.locale.common.mission.todayMission.title')}
        </AppText>
      </View>
      <AppText variant="xl" className="mt-3 font-bold text-text-v2">
        {missionTitle ?? title}
      </AppText>
      <View className="mt-2 flex-row items-center">
        <AppText
          variant="md"
          className="flex-1 pr-4 leading-6 text-text-muted-v2"
        >
          {todayMission?.description ?? description}
        </AppText>

        <View className="h-24 w-24 shrink-0 items-center justify-center rounded-[26px] border border-primary-v2/40 bg-primary-v2/20">
          <View pointerEvents="none" className="absolute -right-2 -top-5">
            <Svg width={32} height={26} viewBox="0 0 32 26">
              <Path
                d="M6 10 L7 2 M16 13 L21 6 M24 21 L30 18"
                stroke={accentColor}
                strokeWidth={3}
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <AppIcon
            icon={Shield}
            size={52}
            className="text-link-v2"
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
