import { BookOpen, Bot } from 'lucide-react-native';
import { View } from 'react-native';

import { AIChatRoutes } from '@/features/AIChat';
import { JournalRoutes } from '@/features/journal';
import { QuickActionCard } from './QuickActionCard';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';
import { selectApplicationConfig } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useTabNavigation } from '@/navigation/Tab/hooks/useTabNavigation';
import { useTranslation } from 'react-i18next';

interface QuickActionCardComponentProps {}

export function QuickActionCardComponent({}: QuickActionCardComponentProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const navigation = useTabNavigation();

  const { t } = useTranslation();

  return (
    <View className="flex-row items-stretch justify-between">
      <QuickActionCard
        icon={BookOpen}
        title={t('app.locale.home.quickActionCard.journal.title')}
        description={t('app.locale.home.quickActionCard.journal.description')}
        actionLabel={t('app.locale.home.quickActionCard.journal.actionLabel')}
        accentClassName="text-link-v2"
        iconBackgroundClassName="bg-primary-v2/15"
        onPress={() => {
          navigation.navigate(TabRoutes.Journal, {
            screen: JournalRoutes.CreateJournal,
          });
          // navigate to journal
        }}
      />

      <QuickActionCard
        icon={Bot}
        title={`${
          applicationConfig?.aiCoachName ??
          t('app.locale.home.quickActionCard.aiCoachName')
        }`}
        description={
          applicationConfig?.aiCoachMessage ??
          t('app.locale.home.quickActionCard.aiCoachMessage') ??
          ''
        }
        actionLabel={t('app.locale.home.quickActionCard.aiCoach.actionLabel')}
        accentClassName="text-link-v2"
        iconBackgroundClassName="bg-primary-v2/15"
        onPress={() => {
          // navigate to AI coach
          navigation.navigate(TabRoutes.AI, {
            screen: AIChatRoutes.AIChat,
          });
        }}
      />
    </View>
  );
}
