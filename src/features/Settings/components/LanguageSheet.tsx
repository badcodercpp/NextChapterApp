import { AppIcon, AppPressable, AppText } from '@/components';
import { Check, X } from 'lucide-react-native';
import { FlatList, Modal, View } from 'react-native';

import { TLanguageCode } from '@/translation/types';
import { availableLanguages } from '@/translation/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type LanguageSheetProps = {
  selected: TLanguageCode;
  onSelect: (code: TLanguageCode) => void;
  onClose: () => void;
};

export function LanguageSheet({
  selected,
  onSelect,
  onClose,
}: LanguageSheetProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      {/* Full screen overlay */}
      <View className="flex-1 justify-end">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss language chooser"
          className="absolute inset-0 bg-black/40"
          onPress={onClose}
        />

        {/* Bottom sheet */}
        <View
          accessibilityViewIsModal
          className="h-[50%] rounded-t-3xl border border-border bg-card"
          style={{
            paddingBottom: bottom,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-4">
            <AppText variant="lg" className="font-bold text-text-secondary">
              Language
            </AppText>

            <AppPressable
              accessibilityRole="button"
              accessibilityLabel="Close language chooser"
              className="h-11 w-11 items-center justify-center"
              onPress={onClose}
            >
              <AppIcon icon={X} size={22} className="text-text-secondary" />
            </AppPressable>
          </View>

          {/* Languages */}
          <FlatList
            data={availableLanguages}
            keyExtractor={item => item.code}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="px-4 pb-4"
            renderItem={({ item }) => {
              const isSelected = selected === item.code;

              return (
                <AppPressable
                  accessibilityRole="radio"
                  accessibilityLabel={item.label}
                  accessibilityState={{
                    checked: isSelected,
                  }}
                  className={`mb-2 flex-row items-center rounded-2xl border px-4 py-4 ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-transparent'
                  }`}
                  onPress={() => onSelect(item.code as TLanguageCode)}
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
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
