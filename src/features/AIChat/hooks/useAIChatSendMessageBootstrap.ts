import {
  SendAiChatMessageInput,
  useLazyLatestAiChatMessageQuery,
  useLazyMyAiChatConversationsQuery,
  useSendAiChatMessageMutation,
} from '@/__generated__/graphql';
import { useCallback, useTransition } from 'react';

import { MasterFormData } from '@/form/types';
import { useFormContext } from 'react-hook-form';

export const useAIChatSendMessageBootstrap = () => {
  const { setValue } = useFormContext<MasterFormData>();
  const [isBootstrapPending, startTransition] = useTransition();
  const [triggerSendAiChatMessageMutation] = useSendAiChatMessageMutation();
  const [triggerMyAiChatConversationsQuery] =
    useLazyMyAiChatConversationsQuery();
  const [triggerLatestAiChatMessageQuery] = useLazyLatestAiChatMessageQuery();

  const sendAiChatMessage = useCallback(
    (input: SendAiChatMessageInput) => {
      startTransition(async () => {
        await triggerSendAiChatMessageMutation({ input }).unwrap();
        await triggerLatestAiChatMessageQuery().unwrap();
        await triggerMyAiChatConversationsQuery().unwrap();
        setValue('aiChat.message', '');
      });
    },
    [
      triggerLatestAiChatMessageQuery,
      triggerMyAiChatConversationsQuery,
      triggerSendAiChatMessageMutation,
      setValue,
    ],
  );

  return {
    isBootstrapPending,
    sendAiChatMessage,
  };
};
