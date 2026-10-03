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
    <AppCard className="rounded-[28px] border border-primary/30 bg-card p-5">
      <View className="flex-row items-start">
        {/* Focus Icon */}
        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/20">
          <AppIcon
            icon={Target}
            size={24}
            className="text-primary"
            strokeWidth={2}
          />
        </View>

        {/* Focus Content */}
        <View className="ml-3 flex-1">
          <AppText variant="lg" className="text-primary">
            {t('app.locale.home.todayFocus.title')}
          </AppText>

          <AppText variant="md" className="mt-1 text-text">
            {todayFocusContent}
          </AppText>
        </View>

        {/* Day */}
        <View className="ml-3 items-end">
          <AppText variant="xl" className="text-primary">
            {t('app.locale.home.todayFocus.dayLabel')} {todayQuestion?.day ?? 1}
          </AppText>

          <AppText variant="sm" className="mt-0.5 text-text-secondary">
            {t('app.locale.home.todayFocus.ofLabel')}{' '}
            {applicationConfig?.totalProgramDays ?? 90}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
