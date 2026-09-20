import { AppCard, AppIcon, AppText } from '@/components';
import {
  Bell,
  Check,
  Image as ImageIcon,
  Shield,
  UserRound,
} from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';

interface UpdatedItem {
  id: string;
  label: string;
  icon: typeof UserRound;
}

interface ProfileUpdatedSummaryProps {
  items?: UpdatedItem[];
  className?: string;
}

const DEFAULT_ITEMS: UpdatedItem[] = [
  {
    id: 'display-name-bio',
    label: 'Display name & bio',
    icon: UserRound,
  },
  {
    id: 'profile-photo',
    label: 'Profile photo',
    icon: ImageIcon,
  },
  {
    id: 'notifications',
    label: 'Notification preferences',
    icon: Bell,
  },
  {
    id: 'privacy',
    label: 'Privacy settings',
    icon: Shield,
  },
];

export function ProfileUpdatedSummary({
  items = DEFAULT_ITEMS,
  className,
}: ProfileUpdatedSummaryProps) {
  return (
    <AppCard
      className={cn(
        'w-full rounded-[24]',
        'border border-white/10',
        'bg-white/[0.05]',
        'p-4',
        className,
      )}
    >
      {/* Header */}
      <AppText
        variant="md"
        className="
          mb-4
          font-semibold
          uppercase
          text-text-muted
        "
      >
        What Was Updated
      </AppText>

      {/* Updated Items */}
      <View>
        {items.map((item, index) => (
          <View
            key={item.id}
            className={cn(
              'flex-row items-center',
              index !== items.length - 1 && 'mb-4',
            )}
          >
            {/* Icon */}
            <View
              className="
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-teal-400/30
                bg-teal-400/[0.05]
              "
            >
              <AppIcon
                icon={item.icon}
                size={16}
                className="text-teal-400"
                strokeWidth={2.3}
              />
            </View>

            {/* Label */}
            <AppText
              variant="sm"
              className="
                ml-4
                flex-1
                text-text-secondary
              "
              numberOfLines={1}
            >
              {item.label}
            </AppText>

            {/* Success */}
            <View
              className="
                ml-4
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-teal-400/15
              "
            >
              <AppIcon
                icon={Check}
                size={16}
                className="text-teal-400"
                strokeWidth={3}
              />
            </View>
          </View>
        ))}
      </View>
    </AppCard>
  );
}
