import { AppIcon, AppInput, AppPressable, AppText } from '@/components';
import { Lock, Send, Smile } from 'lucide-react-native';

import { View } from 'react-native';

interface ChatComposerProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSend?: () => void;

  onMoodPress?: () => void;

  disabled?: boolean;
}

export function ChatComposer({
  value = '',
  onChangeText,
  onSend,

  disabled = false,
}: ChatComposerProps) {
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <View className="w-full">
      {/* Composer */}
      <View className="mt-0 flex-row items-center">
        <AppPressable
          onPress={canSend ? onSend : undefined}
          className={`
            mr-2
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-primary
          `}
        >
          <AppIcon
            icon={Smile}
            size={24}
            strokeWidth={2.5}
            className="text-white"
          />
        </AppPressable>

        {/* Message Input */}
        <View className="flex-1">
          <AppInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Type your message..."
            disabled={disabled}
            className="rounded-[25px]"
            inputClassName="text-[18px]"
          />
        </View>

        {/* Send */}
        <AppPressable
          onPress={canSend ? onSend : undefined}
          disabled={!canSend}
          className={`
            ml-2
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            ${canSend ? 'bg-primary' : 'bg-primary/50'}
          `}
        >
          <AppIcon
            icon={Send}
            size={16}
            strokeWidth={2.5}
            className="text-white"
          />
        </AppPressable>
      </View>

      {/* Privacy */}
      <View className="mt-5 flex-row items-center justify-center">
        <AppIcon
          icon={Lock}
          size={17}
          strokeWidth={2.5}
          className="mr-2 text-text-muted"
        />

        <AppText variant="sm" className="text-text-muted">
          Your conversations are private & secure
        </AppText>
      </View>
    </View>
  );
}
