import { AppCard, AppIcon, AppText } from '@/components';
import {
  selectApplicationConfig,
  selectTodayQuestion,
} from '@/state/selectors';
import { useCallback, useMemo } from 'react';

import { ConversationRole } from '@/__generated__/graphql';
import { Target } from 'lucide-react-native';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface TodaysQuestionCardProps {}

export function TodaysQuestionCard({}: TodaysQuestionCardProps) {
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
    <AppCard className="rounded-[28px] border border-border-v2 bg-surface-v2 p-5">
      <View className="flex-row items-center">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-primary-v2/15">
          <AppIcon
            icon={Target}
            size={28}
            className="text-primary-v2"
            strokeWidth={2}
          />
        </View>

        <View className="ml-4 flex-1">
          <AppText variant="sm" className="text-primary-v2">
            {t('app.locale.home.todayFocus.title')}
          </AppText>

          <AppText
            variant="lg"
            className="mt-1 font-semibold leading-snug text-text-v2"
          >
            {todayFocusContent}
          </AppText>
        </View>

        <View className="ml-3 items-end self-start">
          <AppText variant="lg" className="font-bold text-primary-v2">
            {t('app.locale.home.todayFocus.dayLabel')} {todayQuestion?.day ?? 1}
          </AppText>

          <AppText variant="sm" className="text-text-muted-v2">
            {t('app.locale.home.todayFocus.ofLabel')}{' '}
            {applicationConfig?.totalProgramDays ?? 90}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
