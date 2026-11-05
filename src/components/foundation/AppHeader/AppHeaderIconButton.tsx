import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { LucideIcon } from 'lucide-react-native';

interface AppHeaderIconButtonProps {
  icon: LucideIcon;
  accessibilityLabel: string;
  onPress?: () => void;
}

export function AppHeaderIconButton({
  icon,
  accessibilityLabel,
  onPress,
}: AppHeaderIconButtonProps) {
  return (
    <AppPressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className="h-11 w-11 items-center justify-center rounded-full border border-border-v2 bg-surface-v2"
    >
      <AppIcon icon={icon} size={20} className="text-primary-v2" />
    </AppPressable>
  );
}
