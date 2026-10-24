import { AppEmojiPicker, AppIcon, AppPressable } from '@/components';
import React, { useState } from 'react';

import { Smile } from 'lucide-react-native';
import { emojiData } from '@hiraku-ai/react-native-emoji-picker';

interface EmojiSelectorProps {
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiSelector({ onEmojiSelect }: EmojiSelectorProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <AppPressable
        onPress={() => setVisible(v => !v)}
        className={`
            mr-2
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-card
          `}
      >
        <AppIcon icon={Smile} size={20} className="text-white" />
      </AppPressable>
      <AppEmojiPicker
        visible={visible}
        onClose={() => setVisible(false)}
        onEmojiSelect={onEmojiSelect}
        emojis={emojiData}
      />
    </>
  );
}
