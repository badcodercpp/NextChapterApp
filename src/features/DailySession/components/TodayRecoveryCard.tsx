import { AppCard, AppText } from '@/components';
import {
  selectActiveJourney,
  selectApplicationConfig,
} from '@/state/selectors';

import { View } from 'react-native';
import { useSelector } from 'react-redux';

interface TodayRecoveryCardProps {
  title?: string;
  description?: string;
}

export function TodayRecoveryCard({
  title = "Let's take a step toward feeling better.",
  description = 'Answer a few mindful questions, reflect and grow.',
}: TodayRecoveryCardProps) {
  const { data: activeJourney } = useSelector(selectActiveJourney);
  const { data: applicationConfig } = useSelector(selectApplicationConfig);

  return (
    <AppCard className=" rounded-[24px] bg-card border-1 border-border bg-card p-5">
      <View className="relative">
        <AppText variant="sm" className="font-semibold text-primary">
          Day {activeJourney?.currentDay ?? 1} of{' '}
          {applicationConfig?.totalProgramDays}
        </AppText>

        <AppText variant="xl" className="mt-1 font-semibold text-text">
          {title}
        </AppText>

        <AppText variant="md" className="mt-2 text-text">
          {description}
        </AppText>
      </View>
    </AppCard>
  );
}
