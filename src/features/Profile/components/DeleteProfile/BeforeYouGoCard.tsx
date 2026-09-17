import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import {
  BellOff,
  ChevronRight,
  Download,
  Lightbulb,
  PauseCircle,
} from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';

interface BeforeYouGoCardProps {
  onPauseAccount?: () => void;
  onDisableNotifications?: () => void;
  onExportData?: () => void;
}

interface AlternativeAction {
  id: string;
  label: string;
  icon: typeof PauseCircle;
  onPress?: () => void;
}

export function BeforeYouGoCard({
  onPauseAccount,
  onDisableNotifications,
  onExportData,
}: BeforeYouGoCardProps) {
  const actions: AlternativeAction[] = [
    {
      id: 'pause',
      label: 'Pause your account temporarily',
      icon: PauseCircle,
      onPress: onPauseAccount,
    },
    {
      id: 'notifications',
      label: 'Turn off all notifications',
      icon: BellOff,
      onPress: onDisableNotifications,
    },
    {
      id: 'export',
      label: 'Export your data first',
      icon: Download,
      onPress: onExportData,
    },
  ];

  return (
    <AppCard className="rounded-[28px] border border-teal-400/25 bg-teal-400/[0.04] px-4 py-3">
      {/* Header */}
      <View className="mb-4 flex-row items-center">
        <AppIcon
          icon={Lightbulb}
          size={21}
          className="mr-4 text-teal-400"
          strokeWidth={2.5}
        />

        <AppText variant="md" className="font-semibold text-teal-400">
          Before you go — consider instead
        </AppText>
      </View>

      {/* Alternatives */}
      <View>
        {actions.map((action, index) => (
          <AppPressable
            key={action.id}
            onPress={action.onPress}
            disabled={!action.onPress}
            className={cn(
              'py-4 flex-row items-center',
              index !== actions.length - 1 && 'mb-1',
            )}
          >
            {/* Action Icon */}
            <View className="mr-4 w-7 items-center">
              <AppIcon
                icon={action.icon}
                size={23}
                className="text-teal-400"
                strokeWidth={2.3}
              />
            </View>

            {/* Label */}
            <AppText
              variant="sm"
              className="flex-1 font-semibold text-teal-400"
              numberOfLines={1}
            >
              {action.label}
            </AppText>

            {/* Arrow */}
            <AppIcon
              icon={ChevronRight}
              size={22}
              className="ml-3 text-teal-400/70"
              strokeWidth={2.8}
            />
          </AppPressable>
        ))}
      </View>
    </AppCard>
  );
}
