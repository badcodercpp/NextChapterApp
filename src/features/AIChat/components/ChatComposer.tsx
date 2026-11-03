import {
  AppEmojiPicker,
  AppIcon,
  AppInput,
  AppPressable,
  AppText,
} from '@/components';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Lock, Plus, Send } from 'lucide-react-native';
import { MasterFormData } from '@/form/types';
import { SendAiChatMessageInput } from '@/__generated__/graphql';
import { View } from 'react-native';
import { emojiData } from '@hiraku-ai/react-native-emoji-picker';
import { useState } from 'react';

interface ChatComposerProps {
  onSend?: (input: SendAiChatMessageInput) => void;
  disabled?: boolean;
  isBootstrapPending?: boolean;
}

export function ChatComposer({
  onSend,
  isBootstrapPending,
  disabled = false,
}: ChatComposerProps) {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useFormContext<MasterFormData>();
  const [emojiVisible, setEmojiVisible] = useState(false);
  const messageText = useWatch({ control, name: 'aiChat.message' });
  const isDisabled = disabled || !!isBootstrapPending;
  const canSend =
    messageText?.trim().length > 2 &&
    !errors?.aiChat?.message?.message &&
    !isDisabled;

  return (
    <View className="w-full">
      <View className="flex-row items-end gap-2">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Add emoji"
          accessibilityState={{ disabled: isDisabled, expanded: emojiVisible }}
          disabled={isDisabled}
          onPress={() => setEmojiVisible(true)}
          className={`mb-1 h-11 w-11 items-center justify-center rounded-full bg-primary-v2 ${
            isDisabled ? 'opacity-50' : ''
          }`}
        >
          <AppIcon icon={Plus} size={24} className="text-on-primary-v2" />
        </AppPressable>
        <View className="flex-1">
          <Controller
            control={control}
            name="aiChat.message"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                variant="v2"
                accessibilityLabel="Message your AI coach"
                placeholder="Type your message..."
                autoCapitalize="sentences"
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.aiChat?.message?.message}
                onFocus={() => clearErrors('aiChat.message')}
                disabled={isDisabled}
                containerClassName="rounded-3xl"
                inputClassName="max-h-28 min-h-12 py-3 text-[15px] leading-6"
              />
            )}
          />
        </View>
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          accessibilityState={{ disabled: !canSend }}
          disabled={!canSend}
          onPress={() => {
            if (canSend) onSend?.({ message: messageText });
          }}
          className={`mb-1 h-11 w-11 items-center justify-center rounded-full bg-primary-v2 ${
            canSend ? '' : 'opacity-40'
          }`}
        >
          <AppIcon icon={Send} size={21} className="text-on-primary-v2" />
        </AppPressable>
      </View>
      <View className="mt-3 flex-row items-center justify-center gap-2">
        <AppIcon icon={Lock} size={12} className="text-text-muted-v2" />
        <AppText variant="xs" className="shrink text-center text-text-muted-v2">
          Your conversations are private & secure
        </AppText>
      </View>
      <AppEmojiPicker
        variant="v2"
        visible={emojiVisible}
        onClose={() => setEmojiVisible(false)}
        onEmojiSelect={emoji => {
          if (!isDisabled) {
            setValue(
              'aiChat.message',
              `${getValues('aiChat.message') ?? ''} ${emoji}`,
            );
          }
        }}
        emojis={emojiData}
      />
    </View>
  );
}
