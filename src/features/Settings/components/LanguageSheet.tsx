import { AppIcon, AppPressable, AppText } from '@/components';
import { Check, X } from 'lucide-react-native';

import { APP_SUPPORTED_LANGUAGES } from '@/features/Settings/constants';
import { View } from 'react-native';

type LanguageSheetProps = {
  selected: string;
  onSelect: (code: string) => void;
  onClose: () => void;
};

export function LanguageSheet({
  selected,
  onSelect,
  onClose,
}: LanguageSheetProps) {
  return (
    <View className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-card p-5">
      <View className="mb-6 flex-row items-center justify-between">
        <AppText variant="lg" className="font-bold text-text-secondary">
          Language
        </AppText>

        <AppPressable onPress={onClose}>
          <AppIcon icon={X} size={22} className="text-text-secondary" />
        </AppPressable>
      </View>

      {APP_SUPPORTED_LANGUAGES.map(item => {
        const isSelected = selected === item.code;

        return (
          <AppPressable
            key={item.code}
            className="mb-2 flex-row items-center rounded-2xl px-4 py-4"
            onPress={() => onSelect(item.code)}
          >
            <AppText
              variant="lg"
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
  );
}
