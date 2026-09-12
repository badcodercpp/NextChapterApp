import { AppIcon, AppPressable, AppText } from '@/components';
import { BarChart3, Heart, Moon, Users, Wind } from 'lucide-react-native';

import { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  onPress?: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  onEdit?: () => void;
}

const DEFAULT_ACTIONS: QuickAction[] = [
  {
    id: 'check-in',
    label: 'Check-in',
    icon: Heart,
  },
  {
    id: 'night',
    label: 'Night',
    icon: Moon,
  },
  {
    id: 'breathe',
    label: 'Breathe',
    icon: Wind,
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: BarChart3,
  },
  {
    id: 'friend',
    label: 'Friend',
    icon: Users,
  },
];

export function QuickActions({
  actions = DEFAULT_ACTIONS,
  onEdit,
}: QuickActionsProps) {
  return (
    <View>
      {/* Header */}
      <View className="mb-5 flex-row items-center justify-between">
        <AppText variant="xl" className="font-semibold text-text">
          Quick Actions
        </AppText>

        <AppPressable onPress={onEdit} hitSlop={10}>
          <AppText variant="sm" className="text-primary">
            Edit
          </AppText>
        </AppPressable>
      </View>

      {/* Actions */}
      <View className="flex-row justify-between">
        {actions.map(action => (
          <AppPressable
            key={action.id}
            onPress={action.onPress}
            className="items-center"
          >
            {/* Circle */}
            <View className="h-16 w-16 items-center justify-center rounded-full border border-primary/30">
              <AppIcon
                icon={action.icon}
                size={24}
                className="text-primary"
                strokeWidth={2}
              />
            </View>

            {/* Label */}
            <AppText variant="sm" className="mt-2 text-primary">
              {action.label}
            </AppText>
          </AppPressable>
        ))}
      </View>
    </View>
  );
}
