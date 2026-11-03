import { AppIcon, AppPressable, AppText } from '@/components';
import { Bot, Sparkles } from 'lucide-react-native';
import { View } from 'react-native';
import { selectApplicationConfig, selectMe } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface AICoachCardProps {
  name?: string;
  description?: string;
  onPress?: () => void;
  isOnline?: boolean;
  responseTime?: string;
}

export function AICoachCard({
  name,
  description = "I'm your AI coach. You can talk to me about anything you're feeling. I'm here to listen, support, and guide you forward.",
  onPress,
  isOnline = true,
  responseTime = '< 5s',
}: AICoachCardProps) {
  const { data: me } = useSelector(selectMe);
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const displayName = name ?? me?.displayName;

  const card = (
    <View className="rounded-3xl border border-primary-v2/40 bg-surface-v2 p-4">
      <View className="flex-row items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-v2">
          <AppIcon icon={Sparkles} size={21} className="text-on-primary-v2" />
        </View>
        <AppText variant="xl" className="flex-1 font-semibold text-text-v2">
          Hi{displayName ? ` ${displayName}` : ''} 👋
        </AppText>
      </View>
      <View className="mt-3 flex-row items-center gap-3">
        <AppText variant="md" className="flex-1 leading-6 text-text-muted-v2">
          {applicationConfig?.aiCoachMessage ?? description}
        </AppText>
        <View
          accessible={false}
          className="h-20 w-20 items-center justify-center rounded-3xl border border-primary-v2/30 bg-selected-v2"
        >
          <AppIcon
            icon={Bot}
            size={60}
            strokeWidth={1.4}
            className="text-link-v2"
          />
          <View className="mt-1 h-1.5 w-6 rounded-full bg-primary-v2" />
        </View>
      </View>
      <View className="mt-4 flex-row flex-wrap items-center gap-2">
        {isOnline && (
          <View className="flex-row items-center gap-2 rounded-full border border-success-v2/30 bg-success-v2/10 px-3 py-1.5">
            <View className="h-1.5 w-1.5 rounded-full bg-success-v2" />
            <AppText variant="xs" className="font-semibold text-success-v2">
              Online
            </AppText>
          </View>
        )}
        <AppText variant="xs" className="text-text-muted-v2">
          Avg response {responseTime}
        </AppText>
      </View>
    </View>
  );

  return onPress ? (
    <AppPressable accessibilityRole="button" onPress={onPress}>
      {card}
    </AppPressable>
  ) : (
    card
  );
}
