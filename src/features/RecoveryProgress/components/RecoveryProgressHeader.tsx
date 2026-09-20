import { AppIcon, AppPressable, AppText } from '@/components';

import { Share2 } from 'lucide-react-native';
import { View } from 'react-native';
import { cn } from '@/utils';

export type RecoveryProgressTab =
  | 'overview'
  | 'insights'
  | 'streaks'
  | 'history';

interface RecoveryProgressHeaderProps {
  activeTab: RecoveryProgressTab;
  onTabChange: (tab: RecoveryProgressTab) => void;
  onSharePress?: () => void;
}

const TABS: {
  id: RecoveryProgressTab;
  label: string;
}[] = [
  {
    id: 'overview',
    label: 'Overview',
  },
  {
    id: 'insights',
    label: 'Insights',
  },
  {
    id: 'streaks',
    label: 'Streaks',
  },
  {
    id: 'history',
    label: 'History',
  },
];

export function RecoveryProgressHeader({
  activeTab,
  onTabChange,
  onSharePress,
}: RecoveryProgressHeaderProps) {
  return (
    <View className="w-full">
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <AppText
            variant="md"
            className="font-semibold leading-tight text-white"
          >
            Recovery Progress
          </AppText>

          <AppText variant="xl" className="mt-2 text-text-muted">
            Track your healing journey
          </AppText>
        </View>

        {/* Share */}
        {onSharePress && (
          <AppPressable
            onPress={onSharePress}
            className="
              h-[59px]
              w-[73px]
              items-center
              justify-center
              rounded-full
              border
              border-primary/50
              bg-primary/[0.08]
            "
            accessibilityRole="button"
            accessibilityLabel="Share recovery progress"
          >
            <AppIcon
              icon={Share2}
              size={27}
              className="text-primary"
              strokeWidth={2.5}
            />
          </AppPressable>
        )}
      </View>

      {/* Tabs */}
      <View
        className="
          mt-7
          h-[81px]
          w-full
          flex-row
          items-center
          rounded-[29px]
          border
          border-white/10
          bg-white/[0.05]
          p-2
        "
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;

          return (
            <AppPressable
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              className={cn(
                'h-[63px] flex-1 items-center justify-center rounded-[25px]',
                isActive && 'bg-primary',
              )}
              accessibilityRole="tab"
              accessibilityState={{
                selected: isActive,
              }}
            >
              <AppText
                variant="lg"
                className={cn(
                  'font-semibold',
                  isActive ? 'text-white' : 'text-text-muted',
                )}
              >
                {tab.label}
              </AppText>
            </AppPressable>
          );
        })}
      </View>
    </View>
  );
}
