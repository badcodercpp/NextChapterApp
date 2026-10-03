import { AppIcon, AppText } from '@/components';

import { Sparkles } from 'lucide-react-native';
import { View } from 'react-native';

interface RememberCardProps {
  title: string;
  message: string;
}

export function RememberCard({ title, message }: RememberCardProps) {
  return (
    <View className="mt-0 overflow-hidden rounded-[24px] border border-border bg-card p-4">
      <View className="flex-row">
        {/* Icon */}
        <View className="pt-1">
          <AppIcon icon={Sparkles} size={20} className="text-primary" />
        </View>

        {/* Text */}
        <View className="ml-4 flex-1">
          <AppText variant="lg" className="font-semibold text-primary">
            {title}
          </AppText>

          <AppText variant="md" className="mt-1 leading-6 text-text">
            {message}
          </AppText>
        </View>
      </View>
    </View>
  );
}
