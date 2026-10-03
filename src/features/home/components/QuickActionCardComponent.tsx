import { BookOpen, Bot } from 'lucide-react-native';
import { LayoutChangeEvent, View } from 'react-native';

import { QuickActionCard } from './QuickActionCard';
import { selectApplicationConfig } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface QuickActionCardComponentProps {}

export function QuickActionCardComponent({}: QuickActionCardComponentProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const [cardHeight, setCardHeight] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setCardHeight(prev => Math.max(prev, height));
  };

  const { t } = useTranslation();

  return (
    <View className="flex-row flex-wrap justify-between">
      <QuickActionCard
        icon={BookOpen}
        title={t('app.locale.home.quickAction.journalPrompt.title')}
        description={t('app.locale.home.quickAction.journalPrompt.description')}
        actionLabel={t('app.locale.home.quickAction.journalPrompt.actionLabel')}
        accentClassName="text-primary"
        iconBackgroundClassName="bg-primary/15"
        onPress={() => {
          // navigate to journal
        }}
        onLayout={handleLayout}
        style={cardHeight ? { height: cardHeight } : undefined}
      />

      <QuickActionCard
        icon={Bot}
        title={`${
          applicationConfig?.aiCoachName ??
          t('app.locale.home.quickAction.aiCoachName')
        }`}
        description={
          applicationConfig?.aiCoachMessage ??
          t('app.locale.home.quickAction.aiCoachMessage') ??
          ''
        }
        actionLabel={t('app.locale.home.quickAction.aiCoach.actionLabel')}
        accentClassName="text-secondary"
        iconBackgroundClassName="bg-secondary/15"
        onPress={() => {
          // navigate to AI coach
        }}
        onLayout={handleLayout}
        style={cardHeight ? { height: cardHeight } : undefined}
      />
    </View>
  );
}
