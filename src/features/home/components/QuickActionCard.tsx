import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { View, ViewProps } from 'react-native';

import { LucideIcon } from 'lucide-react-native';

interface QuickActionCardProps extends ViewProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  accentClassName?: string;
  iconBackgroundClassName?: string;
  onPress?: () => void;
}

export function QuickActionCard({
  icon,
  title,
  description,
  actionLabel,
  accentClassName = 'text-primary-v2',
  iconBackgroundClassName = 'bg-primary-v2/15',
  onPress,
  ...rest
}: QuickActionCardProps) {
  return (
    <AppPressable className="w-[48%]" onPress={onPress}>
      <AppCard
        {...rest}
        className="rounded-[28px] border border-border bg-surface-v2 p-5"
      >
        {/* Icon */}
        <View
          className={`h-12 w-12 items-center justify-center rounded-full ${iconBackgroundClassName}`}
        >
          <AppIcon
            icon={icon}
            size={24}
            className={accentClassName}
            strokeWidth={2}
          />
        </View>

        {/* Content */}
        <View className="mt-4 flex-1">
          <AppText
            variant="lg"
            className="font-semibold text-text-v2"
            numberOfLines={1}
          >
            {title}
          </AppText>

          <AppText
            variant="sm"
            className="mt-1 leading-5 text-text-muted-v2"
            numberOfLines={4}
          >
            {description}
          </AppText>
        </View>

        {/* Action */}
        <AppText
          variant="sm"
          className={`mt-4 font-semibold ${accentClassName}`}
          numberOfLines={1}
        >
          {actionLabel} →
        </AppText>
      </AppCard>
    </AppPressable>
  );
}
