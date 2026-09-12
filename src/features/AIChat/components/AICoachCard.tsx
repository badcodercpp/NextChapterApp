import { AppCard, AppIcon, AppPressable, AppText } from '@/components';

import AppAiLogo from '@/assets/icons/svg/app_ai_logo.svg';
import { Sparkles } from 'lucide-react-native';
import { View } from 'react-native';

interface AICoachCardProps {
  name?: string;
  description?: string;
  onPress?: () => void;
  isOnline?: boolean;
  responseTime?: string;
}

export function AICoachCard({
  name = 'Ajay',
  description = "I'm your AI coach. You can talk to me about anything you're feeling. I'm here to listen, support, and guide you forward.",
  onPress,
  isOnline = true,
  responseTime = '< 1s',
}: AICoachCardProps) {
  return (
    <AppPressable onPress={onPress}>
      <AppCard className="overflow-hidden rounded-[28px] border border-secondary/40 bg-card px-5 py-5">
        <View className="flex-row">
          {/* Left Content */}
          <View className="flex-1 pr-2">
            {/* Greeting */}
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <AppIcon
                  icon={Sparkles}
                  size={20}
                  className="text-white"
                  strokeWidth={2}
                />
              </View>

              <AppText variant="xl" className="ml-3 font-semibold text-text">
                Hi {name} 👋
              </AppText>
            </View>

            {/* Description */}
            <AppText
              variant="md"
              className="mt-3 leading-7 text-text-secondary"
            >
              {description}
            </AppText>

            {/* Status */}
            <View className="mt-4 flex-row items-center">
              {isOnline && (
                <View className="flex-row items-center rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1.5">
                  <View className="mr-2 h-2 w-2 rounded-full bg-green-400" />

                  <AppText variant="xs" className="font-medium text-green-400">
                    Online
                  </AppText>
                </View>
              )}

              <AppText variant="xs" className="ml-3 text-text-muted">
                Avg response {responseTime}
              </AppText>
            </View>
          </View>

          {/* Robot Illustration */}
          <View className="w-[125px] items-center justify-center">
            <AppAiLogo width={125} height={125} />
          </View>
        </View>
      </AppCard>
    </AppPressable>
  );
}
