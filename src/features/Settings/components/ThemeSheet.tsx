import { APP_SUPPORTED_THEMES, AppTheme } from '@/features/Settings/constants';
import { AppIcon, AppPressable, AppText } from '@/components';
import { Check, X } from 'lucide-react-native';

import { Modal, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ThemeSheetProps = {
  selected: AppTheme;
  onSelect: (theme: AppTheme) => void;
  onClose: () => void;
};

export function ThemeSheet({ selected, onSelect, onClose }: ThemeSheetProps) {
  const { bottom } = useSafeAreaInsets();
  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss theme chooser"
          className="absolute bottom-0 left-0 right-0 top-0 bg-black/40"
          onPress={onClose}
        />
        <View
          accessibilityViewIsModal
          className="rounded-t-3xl border border-border bg-card p-5"
          style={{ paddingBottom: bottom + 20 }}
        >
          <View className="mb-6 flex-row items-center justify-between">
            <AppText variant="lg" className="font-bold text-text-secondary">
              Theme
            </AppText>

            <AppPressable
              accessibilityRole="button"
              accessibilityLabel="Close theme chooser"
              className="h-11 w-11 items-center justify-center"
              onPress={onClose}
            >
              <AppIcon icon={X} size={22} className="text-text-secondary" />
            </AppPressable>
          </View>

          {APP_SUPPORTED_THEMES.map(item => {
            const isSelected = selected === item.value;

            return (
              <AppPressable
                key={item.value}
                accessibilityRole="radio"
                accessibilityLabel={item.label}
                accessibilityState={{ checked: isSelected }}
                className={`mb-2 flex-row items-center rounded-2xl border px-4 py-4 ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-transparent'
                }`}
                onPress={() => onSelect(item.value)}
              >
                <AppText
                  variant="xl"
                  className="flex-1 font-medium text-text-secondary"
                >
                  {item.label}
                </AppText>

                {isSelected && (
                  <AppIcon icon={Check} size={20} className="text-primary" />
                )}
              </AppPressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}
