import { AppHeaderIconButton } from '@/components';
import { Share2 } from 'lucide-react-native';

interface RecoveryProgressShareButtonProps {
  handleSharePress: () => Promise<void>;
}

export function RecoveryProgressShareButton({
  handleSharePress,
}: RecoveryProgressShareButtonProps) {
  return (
    <AppHeaderIconButton
      icon={Share2}
      accessibilityLabel="Share recovery progress"
      onPress={handleSharePress}
    />
  );
}
