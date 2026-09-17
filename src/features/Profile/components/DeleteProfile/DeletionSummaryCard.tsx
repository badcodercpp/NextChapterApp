import { AppCard, AppIcon, AppText } from '@/components';
import {
  BarChart3,
  BookOpen,
  MessageCircle,
  Trash2,
  Trophy,
  UserRound,
} from 'lucide-react-native';

import { View } from 'react-native';

interface DeletionItem {
  id: string;
  label: string;
  icon: typeof BookOpen;
}

interface DeletionSummaryCardProps {
  items?: DeletionItem[];
}

const DEFAULT_ITEMS: DeletionItem[] = [
  {
    id: 'journal',
    label: 'All journal entries & reflections',
    icon: BookOpen,
  },
  {
    id: 'progress',
    label: 'Your recovery progress & stats',
    icon: BarChart3,
  },
  {
    id: 'achievements',
    label: 'Achievements & streaks',
    icon: Trophy,
  },
  {
    id: 'sessions',
    label: 'Session history & AI conversations',
    icon: MessageCircle,
  },
  {
    id: 'profile',
    label: 'Profile information & settings',
    icon: UserRound,
  },
];

export function DeletionSummaryCard({
  items = DEFAULT_ITEMS,
}: DeletionSummaryCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[24px] border border-red-400/25 bg-white/[0.04] p-0">
      {/* Header */}
      <View className="py-4 flex-row items-center border-b border-red-400/20 px-7">
        <AppIcon
          icon={Trash2}
          size={23}
          className="mr-4 text-red-400"
          strokeWidth={2.5}
        />

        <AppText
          variant="sm"
          className="font-semibold uppercase tracking-[2px] text-red-400"
        >
          What Will Be Deleted
        </AppText>
      </View>

      {/* Items */}
      <View className="px-4 py-1">
        {items.map(item => (
          <View
            key={item.id}
            className="mb-4 py-1 flex-row items-center last:mb-0"
          >
            {/* Icon Circle */}
            <View className="mr-4 h-6 w-6 items-center justify-center rounded-full border border-red-400/30 bg-red-400/[0.03]">
              <AppIcon
                icon={item.icon}
                size={16}
                className="text-red-400"
                strokeWidth={2}
              />
            </View>

            {/* Label */}
            <AppText
              variant="sm"
              className="flex-1 text-text-secondary"
              numberOfLines={2}
            >
              {item.label}
            </AppText>
          </View>
        ))}
      </View>
    </AppCard>
  );
}
