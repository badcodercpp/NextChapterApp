import { AppIcon, AppPressable, AppText } from '@/components';
import { Save, Trash2 } from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';

interface WellnessFocusSectionProps {
  onSave?: () => void;
  onDeleteAccount?: () => void;

  saving?: boolean;
}

export function WellnessFocusSection({
  onSave,
  onDeleteAccount,
  saving = false,
}: WellnessFocusSectionProps) {
  return (
    <View className="w-full">
      {/* Save Changes */}
      {onSave && (
        <AppPressable
          onPress={onSave}
          disabled={saving}
          className={cn(
            'mt-4 py-3 w-full flex-row items-center justify-center',
            'rounded-[24px]',
            'bg-primary',
            saving && 'opacity-60',
          )}
        >
          <AppIcon
            icon={Save}
            size={27}
            className="mr-3 text-white"
            strokeWidth={2.5}
          />

          <AppText variant="xl" className="font-semibold text-white">
            {saving ? 'Saving...' : 'Save Changes'}
          </AppText>
        </AppPressable>
      )}

      {/* Danger Zone */}
      {onDeleteAccount && (
        <View
          className={cn(
            'mt-4 rounded-[27px]',
            'border border-red-400/20',
            'bg-red-500/[0.04]',
            'p-4',
          )}
        >
          <AppText variant="lg" className="mb-2 font-semibold text-red-400">
            Danger Zone
          </AppText>

          <AppPressable
            onPress={onDeleteAccount}
            className="flex-row items-center"
          >
            <AppIcon
              icon={Trash2}
              size={24}
              className="mr-4 text-red-400"
              strokeWidth={2.3}
            />

            <AppText variant="sm" className="font-semibold text-red-400">
              Delete my account
            </AppText>
          </AppPressable>
        </View>
      )}
    </View>
  );
}
