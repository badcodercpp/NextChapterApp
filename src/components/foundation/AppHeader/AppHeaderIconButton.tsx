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
      className="h-11 w-11 items-center justify-center rounded-full bg-transparent"
    >
      <AppIcon icon={icon} size={28} className="text-text-v2" />
    </AppPressable>
  );
}
