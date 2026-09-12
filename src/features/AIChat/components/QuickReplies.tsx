import { AppIcon, AppPressable, AppText } from '@/components';
import { CloudRain, Grid2X2, Heart, Leaf } from 'lucide-react-native';

import { View } from 'react-native';

interface QuickReply {
  id: string;
  label: string;
  icon: typeof Heart;
  color: string;
}

interface QuickRepliesProps {
  replies?: QuickReply[];
  onPress?: (reply: QuickReply) => void;
}

const DEFAULT_REPLIES: QuickReply[] = [
  {
    id: 'overthinking',
    label: 'Help me manage overthinking',
    icon: Heart,
    color: 'text-secondary',
  },
  {
    id: 'motivate',
    label: 'Motivate me today',
    icon: Leaf,
    color: 'text-green-400',
  },
  {
    id: 'bad-day',
    label: "I'm having a bad day",
    icon: CloudRain,
    color: 'text-cyan-400',
  },
  {
    id: 'more',
    label: 'More',
    icon: Grid2X2,
    color: 'text-text-muted',
  },
];

export function QuickReplies({
  replies = DEFAULT_REPLIES,
  onPress,
}: QuickRepliesProps) {
  return (
    <View>
      {/* Header */}
      <AppText
        variant="sm"
        className="mb-2 font-semibold tracking-wide text-text-muted"
      >
        QUICK REPLIES
      </AppText>

      {/* Replies */}
      <View className="flex-row flex-wrap gap-2">
        {replies.map(reply => (
          <AppPressable
            key={reply.id}
            onPress={() => onPress?.(reply)}
            className={`flex-row items-center rounded-full border px-4 py-2 ${reply.color.replace(
              'text-',
              'border-',
            )}/40 bg-card/30`}
          >
            <AppIcon
              icon={reply.icon}
              size={21}
              strokeWidth={2}
              className={reply.color}
            />

            <AppText variant="md" className={`ml-2 font-medium ${reply.color}`}>
              {reply.label}
            </AppText>
          </AppPressable>
        ))}
      </View>
    </View>
  );
}
