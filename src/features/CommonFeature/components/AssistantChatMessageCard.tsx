import { AppIcon, AppText } from '@/components';
import { Bot, CalendarDays } from 'lucide-react-native';
import { AssistantAvatar } from '@/features/CommonFeature/components/AssistantAvatar';
import { View } from 'react-native';
import { format } from 'date-fns';

interface AssistantChatMessageCardProps {
  content: string;
  createdAt: string;
  themed?: boolean;
}

export function AssistantChatMessageCard({
  content,
  createdAt,
  themed = false,
}: AssistantChatMessageCardProps) {
  const timestamp = createdAt
    ? format(new Date(createdAt), 'd MMM yyyy - h:mma')
    : '';
  if (themed) {
    return (
      <View className="overflow-hidden rounded-[26px] border border-primary-v2/40 bg-background-v2 p-4">
        <View
          pointerEvents="none"
          className="absolute inset-0 bg-primary-v2/10"
        />
        <View
          pointerEvents="none"
          className="absolute -bottom-16 -right-12 h-28 w-48 rounded-full bg-primary-v2/20"
        />
        <View className="flex-row items-start">
          <View className="h-11 w-11 items-center justify-center rounded-[14px] bg-primary-v2/20">
            <AppIcon icon={Bot} size={27} className="text-link-v2" />
          </View>
          <AppText
            variant="lg"
            className="ml-3 flex-1 border-l border-primary-v2/40 pl-3 leading-7 text-text-v2"
          >
            {content}
          </AppText>
        </View>
        {!!createdAt && (
          <View className="mt-4 flex-row items-center">
            <AppIcon
              icon={CalendarDays}
              size={16}
              className="mr-2 text-link-v2"
            />
            <AppText variant="xs" className="flex-1 text-text-muted-v2">
              {timestamp}
            </AppText>
          </View>
        )}
      </View>
    );
  }
  return (
    <View className="flex-1 flex-row items-start">
      <AssistantAvatar />

      <View className="flex-1">
        <View className="rounded-[24px] border border-border bg-surface px-4 py-4">
          <AppText variant="lg" className="">
            {content}
          </AppText>
        </View>

        <AppText variant="xs" className="mt-1 ml-1 text-text-muted">
          {timestamp}
        </AppText>
      </View>
    </View>
  );
}
