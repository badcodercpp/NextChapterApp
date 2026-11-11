import { AppAvatar, AppIcon, AppPressable, AppText } from '@/components';
import { selectApplicationConfig, selectMe } from '@/state/selectors';

import { Pencil } from 'lucide-react-native';
import { View } from 'react-native';
import { toHttpsURL } from '@/utils';
import { useSelector } from 'react-redux';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useResolveClassNames } from 'uniwind';

interface ProfileSummaryCardProps {
  onEditPress?: () => void;
}

export function ProfileSummaryCard({ onEditPress }: ProfileSummaryCardProps) {
  const { data: me } = useSelector(selectMe);
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const { backgroundColor: accent } = useResolveClassNames('bg-secondary');

  return (
    <View className="overflow-hidden rounded-[28px] border border-secondary/50 bg-card/60 p-3">
      <View pointerEvents="none" className="absolute inset-0">
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient
              id="profileSummaryBackground"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <Stop offset="0" stopColor={accent} stopOpacity={0.28} />
              <Stop offset="1" stopColor={accent} stopOpacity={0.03} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#profileSummaryBackground)" />
        </Svg>
      </View>
      <View className="flex-row items-center">
        {/* Profile Image */}
        <View className="mr-4">
          <View
            className="items-center justify-center rounded-full border-2 border-secondary p-1"
            style={{
              shadowColor: accent,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <AppAvatar
              size="md"
              name={me?.displayName ?? ''}
              uri={toHttpsURL(me?.avatarUrl) ?? undefined}
            />
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Name + Edit */}
          <View className="flex-row items-start justify-between">
            <AppText
              variant="lg"
              className="flex-1 font-semibold text-text"
              numberOfLines={1}
            >
              {me?.displayName ?? ''}
            </AppText>

            <AppPressable
              onPress={onEditPress}
              className="
                ml-3
                w-10
                h-10
                flex-row
                items-center
                justify-center
                rounded-full
                border border-text-muted/20
                bg-white/5
                absolute
                right-0
              "
            >
              <AppIcon
                icon={Pencil}
                size={18}
                strokeWidth={2.5}
                className="text-secondary"
              />
            </AppPressable>
          </View>
          {/* Quote */}
          <View className="mt-1 flex-row">
            <AppText
              variant="sm"
              className="mr-8 flex-1 text-text-secondary"
              numberOfLines={2}
            >
              {me?.bio ?? applicationConfig?.profileSummaryQuote}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}
