import { AppIcon } from '@/components';
import { Bot } from 'lucide-react-native';
import { View } from 'react-native';

export const AssistantAvatar = () => (
  <View className="h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface mr-2 mt-2">
    <AppIcon icon={Bot} size={24} className="text-white" strokeWidth={2} />
  </View>
);
