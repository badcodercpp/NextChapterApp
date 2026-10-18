import {
  useLazyLatestAiChatMessageQuery,
  useLazyMyAiChatConversationsQuery,
} from '@/__generated__/graphql';

import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

export const useAIChatBootstrap = () => {
  const [triggerMyAiChatConversationsQuery] =
    useLazyMyAiChatConversationsQuery();
  const [triggerLatestAiChatMessageQuery] = useLazyLatestAiChatMessageQuery();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    triggerLatestAiChatMessageQuery();
    triggerMyAiChatConversationsQuery();
  }, [
    triggerMyAiChatConversationsQuery,
    triggerLatestAiChatMessageQuery,
    isFocused,
  ]);
};
