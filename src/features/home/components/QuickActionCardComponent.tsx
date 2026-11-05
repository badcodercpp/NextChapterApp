import { BookOpen, Bot } from 'lucide-react-native';
import { LayoutChangeEvent, View } from 'react-native';

import { AIChatRoutes } from '@/features/AIChat';
import { JournalRoutes } from '@/features/journal';
import { QuickActionCard } from './QuickActionCard';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';
import { selectApplicationConfig } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTabNavigation } from '@/navigation/Tab/hooks/useTabNavigation';
import { useTranslation } from 'react-i18next';

interface QuickActionCardComponentProps {}

export function QuickActionCardComponent({}: QuickActionCardComponentProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const [cardHeight, setCardHeight] = useState(0);
  const navigation = useTabNavigation();

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setCardHeight(prev => Math.max(prev, height));
  };

  const { t } = useTranslation();

  return (
    <View className="flex-row flex-wrap justify-between">
      <QuickActionCard
        icon={BookOpen}
        title={t('app.locale.home.quickActionCard.journal.title')}
        description={t('app.locale.home.quickActionCard.journal.description')}
        actionLabel={t('app.locale.home.quickActionCard.journal.actionLabel')}
        accentClassName="text-primary-v2"
        iconBackgroundClassName="bg-primary-v2/15"
        onPress={() => {
          navigation.navigate(TabRoutes.Journal, {
            screen: JournalRoutes.CreateJournal,
          });
          // navigate to journal
        }}
        onLayout={handleLayout}
        style={cardHeight ? { height: cardHeight } : undefined}
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
        accentClassName="text-rose-v2"
        iconBackgroundClassName="bg-rose-v2/15"
        onPress={() => {
          // navigate to AI coach
          navigation.navigate(TabRoutes.AI, {
            screen: AIChatRoutes.AIChat,
          });
        }}
        onLayout={handleLayout}
        style={cardHeight ? { height: cardHeight } : undefined}
      />
    </View>
  );
}
