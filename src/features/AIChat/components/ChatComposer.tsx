import { AppIcon, AppInput, AppPressable, AppText } from '@/components';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Lock, Send } from 'lucide-react-native';

import { EmojiSelector } from '@/features/CommonFeature';
import { MasterFormData } from '@/form/types';
import { SendAiChatMessageInput } from '@/__generated__/graphql';
import { View } from 'react-native';
import { useCallback } from 'react';

interface ChatComposerProps {
  onSend?: (input: SendAiChatMessageInput) => void;
  onMoodPress?: () => void;
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
    clearErrors,
  } = useFormContext<MasterFormData>();

  const messageText = useWatch({
    control,
    name: 'aiChat.message',
  });

  const canSend =
    messageText?.trim().length > 2 &&
    !errors?.aiChat?.message?.message &&
    !disabled &&
    !isBootstrapPending;

  const onEmojiSelect = useCallback(
    (emoji: string) => {
      setValue('aiChat.message', messageText + ' ' + emoji + '');
    },
    [setValue, messageText],
  );

  return (
    <View className="w-full">
      {/* Composer */}
      <View className="mt-0 flex-row items-center">
        <EmojiSelector onEmojiSelect={onEmojiSelect} />

        {/* Message Input */}
        <View className="flex-1">
          <Controller
            control={control}
            name="aiChat.message"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                placeholder="Enter your email"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.aiChat?.message?.message}
                onFocus={() => {
                  clearErrors('aiChat.message');
                }}
                disabled={false}
                className="rounded-[24px]"
                inputClassName="text-[18px]"
              />
            )}
          />
        </View>

        {/* Send */}
        <AppPressable
          onPress={
            canSend ? () => onSend?.({ message: messageText }) : undefined
          }
          disabled={!canSend}
          className={`
            ml-2
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            ${canSend ? 'bg-card' : 'bg-card/50'}
          `}
        >
          <AppIcon icon={Send} size={20} className="text-white" />
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
