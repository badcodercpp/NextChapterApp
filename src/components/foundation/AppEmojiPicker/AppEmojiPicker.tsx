import {
  EmojiData,
  EmojiPicker,
  EmojiPickerThemeProvider,
} from '@hiraku-ai/react-native-emoji-picker';
import { Modal, Pressable, View } from 'react-native';

import React from 'react';
import { useCSSVariable } from 'uniwind';

interface AppEmojiPickerProps {
  visible: boolean;
  emojis: EmojiData[];
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

export function AppEmojiPicker({
  visible,
  emojis,
  onEmojiSelect,
  onClose,
}: AppEmojiPickerProps) {
  const background = useCSSVariable('--color-card');
  const surface = useCSSVariable('--color-surface');
  const card = useCSSVariable('--color-card');
  const text = useCSSVariable('--color-text');
  const textSecondary = useCSSVariable('--color-text-secondary');
  const textMuted = useCSSVariable('--color-text-muted');
  const primary = useCSSVariable('--color-primary');
  const secondary = useCSSVariable('--color-secondary');
  const border = useCSSVariable('--color-border');
  const divider = useCSSVariable('--color-divider');

  const color = (value: string | number | undefined, fallback: string) =>
    String(value ?? fallback);

  const emojiTheme = {
    colors: {
      background: color(background, '#ffffff'),
      backgroundSecondary: color(surface, '#f8fafc'),
      modalBackground: color(background, '#ffffff'),
      headerBackground: color(card, '#ffffff'),
      searchBackground: color(surface, '#f8fafc'),
      tabBackground: color(surface, '#f8fafc'),
      tabActiveBackground: color(primary, '#7c3aed'),
      emojiButtonBackground: color(card, '#ffffff'),
      skinToneButtonBorder: color(border, '#e5e7eb'),

      text: color(text, '#111827'),
      textSecondary: color(textSecondary, '#6b7280'),
      textTertiary: color(textMuted, '#9ca3af'),
      headerTitle: color(text, '#111827'),
      categoryTitle: color(text, '#111827'),
      placeholder: color(textMuted, '#9ca3af'),
      noResults: color(textSecondary, '#6b7280'),

      border: color(border, '#e5e7eb'),
      borderLight: color(divider, '#d1d5db'),
      headerBorder: color(border, '#e5e7eb'),
      tabsBorder: color(border, '#e5e7eb'),
      categoryDivider: color(divider, '#d1d5db'),

      accent: color(primary, '#7c3aed'),
      accentSecondary: color(secondary, '#9333ea'),

      icon: color(textSecondary, '#6b7280'),
      iconActive: color(primary, '#7c3aed'),
      closeIcon: color(text, '#111827'),

      modalOverlay: 'rgba(0, 0, 0, 0.5)',
    },

    opacity: {
      modalOverlay: 0.5,
    },
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        {/* Overlay */}
        <Pressable className="absolute inset-0 bg-black/50" onPress={onClose} />

        {/* Picker */}
        <View
          className="overflow-hidden rounded-t-3xl"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 500,
            backgroundColor: color('background', '#ffffff'),
          }}
        >
          <EmojiPickerThemeProvider theme={emojiTheme}>
            <EmojiPicker emojis={emojis} onEmojiSelect={onEmojiSelect} />
          </EmojiPickerThemeProvider>
        </View>
      </View>
    </Modal>
  );
}
