import { AppIcon, AppPressable, AppText } from '@/components';
import { ArrowRight, Pencil } from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';

interface ProfileCompletionActionsProps {
  onGoToDashboard?: () => void;
  onEditProfile?: () => void;
  disabled?: boolean;
}

export function ProfileCompletionActions({
  onGoToDashboard,
  onEditProfile,
  disabled = false,
}: ProfileCompletionActionsProps) {
  return (
    <View className="w-full">
      {/* Go To Dashboard */}
      <AppPressable
        onPress={onGoToDashboard}
        disabled={disabled}
        className={cn(
          'w-full flex-row items-center justify-center py-3',
          'rounded-[24px]',
          'bg-primary',
          disabled && 'opacity-50',
        )}
        accessibilityRole="button"
        accessibilityLabel="Go to Dashboard"
      >
        <AppText variant="md" className="font-semibold text-white">
          Go to Profile Now
        </AppText>

        <AppIcon
          icon={ArrowRight}
          size={24}
          className="ml-4 text-white"
          strokeWidth={2.5}
        />
      </AppPressable>

      {/* Edit Profile */}
      <AppPressable
        onPress={onEditProfile}
        disabled={disabled}
        className={cn(
          'mt-4 py-3 w-full flex-row items-center justify-center',
          'rounded-[24px]',
          'border border-white/10',
          'bg-white/[0.03]',
          disabled && 'opacity-50',
        )}
        accessibilityRole="button"
        accessibilityLabel="Edit Profile Again"
      >
        <AppIcon
          icon={Pencil}
          size={24}
          className="mr-3 text-text-muted"
          strokeWidth={2.4}
        />

        <AppText variant="md" className="font-semibold text-text-muted">
          Edit Profile Again
        </AppText>
      </AppPressable>
    </View>
  );
}
