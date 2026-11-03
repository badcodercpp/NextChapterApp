import {
  AppContentSingleLineLoader,
  AppIcon,
  AppPressable,
  AppText,
} from '@/components';
import { Headphones, Heart, Sparkles, Sprout } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

import { SendAiChatMessageInput } from '@/__generated__/graphql';
import { selectLatestAiChatMessage } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface QuickRepliesProps {
  onSend?: (input: SendAiChatMessageInput) => void;
  isBootstrapPending?: boolean;
}

const DEFAULT_REPLIES = [
  'Help me manage overthinking',
  'Motivate me today',
  "I'm having a bad day",
];
const REPLY_STYLES = [
  {
    icon: Heart,
    container: 'border-rose-v2/40 bg-rose-v2/10',
    text: 'text-rose-v2',
  },
  {
    icon: Sprout,
    container: 'border-success-v2/40 bg-success-v2/10',
    text: 'text-success-v2',
  },
  {
    icon: Headphones,
    container: 'border-link-v2/40 bg-link-v2/10',
    text: 'text-link-v2',
  },
];

export function QuickReplies({
  onSend,
  isBootstrapPending,
}: QuickRepliesProps) {
  const { data: latestAiChatMessage, loading } = useSelector(
    selectLatestAiChatMessage,
  );
  const replies = latestAiChatMessage?.quickReplies?.length
    ? latestAiChatMessage.quickReplies
    : DEFAULT_REPLIES;

  return (
    <View className="pb-2 pt-2">
      <AppText
        variant="xs"
        className="mb-3 font-semibold tracking-wide text-text-muted-v2"
      >
        QUICK REPLIES
      </AppText>
      {loading ? (
        <AppContentSingleLineLoader />
      ) : (
        <View className="flex-row  gap-2">
          <ScrollView horizontal>
            {replies.map((reply, index) => {
              const style = REPLY_STYLES[index] ?? {
                icon: Sparkles,
                container: 'border-border-v2 bg-surface-v2',
                text: 'text-link-v2',
              };
              return (
                <AppPressable
                  key={`${index}-${reply}`}
                  accessibilityRole="button"
                  accessibilityLabel={reply}
                  accessibilityState={{ disabled: !!isBootstrapPending }}
                  disabled={isBootstrapPending}
                  onPress={() => {
                    if (!isBootstrapPending) onSend?.({ message: reply });
                  }}
                  className={`mr-4 min-h-11 max-w-full flex-row items-center gap-2 rounded-full border px-3 py-2 ${
                    style.container
                  } ${isBootstrapPending ? 'opacity-50' : ''}`}
                >
                  <AppIcon icon={style.icon} size={16} className={style.text} />
                  <AppText
                    variant="xs"
                    className={`shrink font-medium ${style.text}`}
                  >
                    {reply}
                  </AppText>
                </AppPressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
