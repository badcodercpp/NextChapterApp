import { AppIcon, AppInput, AppPressable, AppText } from '@/components';
import { ArrowLeft, Delete, Trash2 } from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';

interface DeleteAccountActionsProps {
  confirmationText: string;
  onConfirmationTextChange: (value: string) => void;

  onDelete?: () => void;
  onKeepAccount?: () => void;

  deleting?: boolean;
}

export function DeleteAccountActions({
  confirmationText,
  onConfirmationTextChange,
  onDelete,
  onKeepAccount,
  deleting = false,
}: DeleteAccountActionsProps) {
  const canDelete = confirmationText.trim().toUpperCase() === 'DELETE';

  return (
    <View className="w-full">
      {/* Confirmation Label */}
      <AppText variant="lg" className="mb-2 font-semibold text-text-muted">
        Type DELETE to confirm
      </AppText>

      {/* Confirmation Input */}
      <AppInput
        value={confirmationText}
        onChangeText={onConfirmationTextChange}
        startIcon={Delete}
        placeholder="DELETE"
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={6}
        inputClassName="font-semibold uppercase tracking-[1px] text-red-400"
        className="mb-4"
      />

      {/* Permanently Delete */}
      <AppPressable
        onPress={onDelete}
        disabled={!canDelete || deleting}
        className={cn(
          'py-4 w-full flex-row items-center justify-center',
          'rounded-[24px]',
          'bg-red-500',
          (!canDelete || deleting) && 'opacity-50',
        )}
        accessibilityRole="button"
        accessibilityLabel="Permanently delete account"
      >
        <AppIcon
          icon={Trash2}
          size={27}
          className="mr-4 text-white"
          strokeWidth={2.5}
        />

        <AppText variant="xl" className="font-semibold text-white">
          {deleting ? 'Deleting Account...' : 'Permanently Delete Account'}
        </AppText>
      </AppPressable>

      {/* Keep Account */}
      <AppPressable
        onPress={onKeepAccount}
        disabled={deleting}
        className={cn(
          'mt-4 py-3 w-full flex-row items-center justify-center',
          'rounded-[24px]',
          'border border-white/10',
          'bg-white/[0.04]',
          deleting && 'opacity-50',
        )}
        accessibilityRole="button"
        accessibilityLabel="Keep my account"
      >
        <AppIcon
          icon={ArrowLeft}
          size={28}
          className="mr-4 text-text-muted"
          strokeWidth={2.5}
        />

        <AppText variant="xl" className="font-semibold text-text-muted">
          Keep My Account
        </AppText>
      </AppPressable>
    </View>
  );
}
