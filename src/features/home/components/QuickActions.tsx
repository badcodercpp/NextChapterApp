import { AppIcon, AppPressable, AppText } from '@/components';
import { BarChart3, Heart, Moon, Users, Wind } from 'lucide-react-native';

import { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  onPress?: () => void;
}

interface QuickActionsProps {
  onEdit?: () => void;
}

export function QuickActions({ onEdit }: QuickActionsProps) {
  const { t } = useTranslation();
  const actions: QuickAction[] = [
    {
      id: 'check-in',
      label: t('app.locale.home.quickAction.checkIn'),
      icon: Heart,
    },
    {
      id: 'night',
      label: t('app.locale.home.quickAction.night'),
      icon: Moon,
    },
    {
      id: 'breathe',
      label: t('app.locale.home.quickAction.breathe'),
      icon: Wind,
    },
    {
      id: 'progress',
      label: t('app.locale.home.quickAction.progress'),
      icon: BarChart3,
    },
    {
      id: 'friend',
      label: t('app.locale.home.quickAction.friend'),
      icon: Users,
    },
  ];

  return (
    <View>
      {/* Header */}
      <View className="mb-5 flex-row items-center justify-between">
        <AppText variant="xl" className="font-semibold text-text">
          {t('app.locale.home.quickAction.title')}
        </AppText>

        <AppPressable onPress={onEdit} hitSlop={10}>
          <AppText variant="sm" className="text-primary">
            {t('app.locale.home.quickAction.edit')}
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
