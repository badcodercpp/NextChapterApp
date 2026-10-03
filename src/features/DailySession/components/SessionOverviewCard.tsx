import { AppCard, AppIcon, AppText } from '@/components';
import {
  CheckSquare,
  Heart,
  MessageSquare,
  TrendingUp,
} from 'lucide-react-native';

import { ReactNode } from 'react';
import { View } from 'react-native';

interface SessionOverviewCardProps {}

export function SessionOverviewCard({}: SessionOverviewCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[22px] border border-border bg-card p-6">
      <AppText variant="xl" className="text-primary">
        What to expect in this session
      </AppText>

      <View className="relative mt-4">
        {/* Connecting line */}
        <View className="absolute left-[12%] right-[12%] top-6 h-px bg-primary" />

        <View className="flex-row justify-between">
          <SessionStep
            icon={
              <AppIcon
                icon={MessageSquare}
                size={20}
                className="text-primary"
              />
            }
            iconClassName="border-primary bg-card"
            title="Answer"
            description="Thoughtful questions"
          />

          <SessionStep
            icon={<AppIcon icon={Heart} size={20} className="text-primary" />}
            iconClassName="border-primary bg-card"
            title="Reflect"
            description="Go deeper with follow-ups"
          />

          <SessionStep
            icon={
              <AppIcon icon={CheckSquare} size={20} className="text-primary" />
            }
            iconClassName="border-primary bg-card"
            title="Mission"
            description="Take action with a small step"
          />

          <SessionStep
            icon={
              <AppIcon icon={TrendingUp} size={20} className="text-primary" />
            }
            iconClassName="border-primary bg-card"
            title="Progress"
            description="See how you're growing"
          />
        </View>
      </View>
    </AppCard>
  );
}

interface SessionStepProps {
  icon: ReactNode;
  iconClassName: string;
  title: ReactNode;
  description: ReactNode;
}

function SessionStep({
  icon,
  iconClassName,
  title,
  description,
}: SessionStepProps) {
  return (
    <View className="w-1/4 items-center">
      <View
        className={`z-10 h-12 w-12 items-center justify-center rounded-full border ${iconClassName}`}
      >
        {icon}
      </View>

      <AppText variant="lg" className="mt-3 text-center text-text">
        {title}
      </AppText>

      <AppText variant="xs" className="mt-2 text-center text-text-muted">
        {description}
      </AppText>
    </View>
  );
}
