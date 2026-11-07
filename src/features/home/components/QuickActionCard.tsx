import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { View, ViewProps } from 'react-native';

import { ArrowRight, LucideIcon } from 'lucide-react-native';

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
    <AppPressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${actionLabel}`}
      className="w-[48%]"
      onPress={onPress}
    >
      <AppCard
        {...rest}
        className="flex-1 overflow-hidden rounded-[24px] border border-primary-v2/30 bg-background-v2 p-3.5"
      >
        <View
          pointerEvents="none"
          className="absolute inset-0 bg-primary-v2/5"
        />
        <View
          pointerEvents="none"
          className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-v2/10"
        />
        {/* Icon */}
        <View
          className={`h-10 w-10 items-center justify-center rounded-[14px] ${iconBackgroundClassName}`}
        >
          <AppIcon
            icon={icon}
            size={24}
            className={accentClassName}
            strokeWidth={2}
          />
        </View>

        {/* Content */}
        <View className="mt-3 flex-1">
          <AppText
            variant="md"
            className="font-semibold text-text-v2"
            numberOfLines={2}
          >
            {title}
          </AppText>

          <AppText
            variant="xs"
            className="mt-1 leading-5 text-text-muted-v2"
            numberOfLines={4}
          >
            {description}
          </AppText>
        </View>

        {/* Action */}
        <View className="mt-4 flex-row items-center justify-between rounded-[14px] border border-primary-v2/25 bg-primary-v2/15 px-2.5 py-2.5">
          <AppText
            variant="xs"
            className={`flex-1 font-semibold ${accentClassName}`}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {actionLabel}
          </AppText>
          <AppIcon
            icon={ArrowRight}
            size={16}
            className={`ml-1 ${accentClassName}`}
          />
        </View>
      </AppCard>
    </AppPressable>
  );
}
