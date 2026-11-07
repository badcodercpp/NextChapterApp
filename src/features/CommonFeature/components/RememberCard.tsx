import { AppIcon, AppText } from '@/components';

import { Sparkles } from 'lucide-react-native';
import { View } from 'react-native';

interface RememberCardProps {
  title: string;
  message: string;
  themed?: boolean;
}

export function RememberCard({
  title,
  message,
  themed = false,
}: RememberCardProps) {
  return (
    <View
      className={
        themed
          ? 'overflow-hidden rounded-[24px] border border-primary-v2/50 bg-background-v2 p-4'
          : 'mt-0 overflow-hidden rounded-[24px] border border-border bg-card p-4'
      }
    >
      {themed && (
        <View
          pointerEvents="none"
          className="absolute -bottom-16 -right-8 h-28 w-44 rounded-full bg-primary-v2/20"
        />
      )}
      <View className="flex-row items-center">
        {/* Icon */}
        <View
          className={
            themed
              ? 'h-12 w-12 items-center justify-center rounded-[16px] bg-primary-v2/20'
              : 'pt-1'
          }
        >
          <AppIcon
            icon={Sparkles}
            size={themed ? 27 : 20}
            className={themed ? 'text-link-v2' : 'text-primary'}
          />
        </View>

        {/* Text */}
        <View
          className={
            themed
              ? 'ml-3 flex-1 border-l border-primary-v2/40 pl-3'
              : 'ml-4 flex-1'
          }
        >
          <AppText
            variant="lg"
            className={
              themed
                ? 'font-semibold text-link-v2'
                : 'font-semibold text-primary'
            }
          >
            {title}
          </AppText>

          <AppText
            variant="md"
            className={
              themed
                ? 'mt-1 leading-6 text-text-v2'
                : 'mt-1 leading-6 text-text'
            }
          >
            {message}
          </AppText>
        </View>
      </View>
    </View>
  );
}
