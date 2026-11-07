import { AppButton, AppCard, AppIcon, AppText } from '@/components';
import {
  selectApplicationConfig,
  selectTodayQuestion,
} from '@/state/selectors';
import { useCallback, useMemo } from 'react';

import { ConversationRole } from '@/__generated__/graphql';
import {
  ArrowRight,
  CalendarDays,
  PencilLine,
  Target,
} from 'lucide-react-native';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface TodaysQuestionCardProps {
  onReflect?: () => void;
  loading?: boolean;
}

export function TodaysQuestionCard({
  onReflect,
  loading = false,
}: TodaysQuestionCardProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
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

  const { t } = useTranslation();

  return (
    <AppCard className="overflow-hidden rounded-[28px] border border-primary-v2/30 bg-background-v2 p-4">
      <View pointerEvents="none" className="absolute inset-0 bg-primary-v2/5" />
      <View
        pointerEvents="none"
        className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-primary-v2/5"
      />

      <View className="flex-row flex-wrap items-center justify-between gap-3">
        <View className="shrink flex-row items-center rounded-full border border-primary-v2/40 bg-primary-v2/10 px-3 py-2">
          <AppIcon icon={Target} size={19} className="text-link-v2" />
          <AppText
            variant="sm"
            className="ml-2 shrink font-semibold text-link-v2"
          >
            {t('app.locale.home.todayFocus.title')}
          </AppText>
        </View>

        <View className="shrink-0 items-end">
          <View className="flex-row items-center">
            <AppIcon
              icon={CalendarDays}
              size={15}
              className="mr-1.5 text-link-v2"
            />
            <AppText variant="sm" className="font-semibold text-link-v2">
              {t('app.locale.home.todayFocus.dayLabel')}{' '}
              {todayQuestion?.day ?? 1}
            </AppText>
          </View>
          <AppText variant="xs" className="mt-0.5 text-text-muted-v2">
            {t('app.locale.home.todayFocus.ofLabel')}{' '}
            {applicationConfig?.totalProgramDays ?? 90}
          </AppText>
        </View>
      </View>

      <View className="mt-4">
        <View className="border-l-2 border-primary-v2/30 pl-3">
          <AppText
            variant="md"
            className="font-semibold leading-6 text-text-v2"
          >
            {todayFocusContent}
          </AppText>
        </View>
      </View>

      {onReflect && (
        <AppButton
          title={t('app.locale.home.todayFocus.reflectNow')}
          variant="secondary"
          leftIcon={PencilLine}
          rightIcon={ArrowRight}
          className="mt-4 rounded-[18px] border border-primary-v2/30 bg-primary-v2/15 py-3"
          onPress={onReflect}
          loading={loading}
          disabled={loading}
        />
      )}
    </AppCard>
  );
}
