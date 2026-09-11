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
  accentClassName = 'text-primary',
  iconBackgroundClassName = 'bg-primary/15',
  onPress,
  ...rest
}: QuickActionCardProps) {
  return (
    <AppPressable className="w-[48%]" onPress={onPress}>
      <AppCard
        {...rest}
        className={` rounded-[28px] border p-4 ${accentClassName.replace(
          'text-',
          'border-',
        )}/30 bg-card`}
      >
        {/* Icon */}
        <View
          className={`h-16 w-16 items-center justify-center rounded-full ${iconBackgroundClassName}`}
        >
          <AppIcon
            icon={icon}
            size={32}
            className={accentClassName}
            strokeWidth={2}
          />
        </View>

        {/* Content */}
        <View className="mt-5 flex-1">
          <AppText variant="lg" className="font-semibold text-text">
            {title}
          </AppText>

          <AppText variant="md" className="mt-1 leading-6 text-text-secondary">
            {description}
          </AppText>
        </View>

        {/* Action */}
        <AppText
          variant="md"
          className={`font-semibold ${accentClassName} mt-4`}
        >
          {actionLabel} →
        </AppText>
      </AppCard>
    </AppPressable>
  );
}
