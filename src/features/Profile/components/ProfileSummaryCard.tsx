import {
  AppAvatar,
  AppIcon,
  AppMountainArtwork,
  AppPressable,
  AppText,
} from '@/components';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { selectApplicationConfig, selectMe } from '@/state/selectors';

import { Pencil } from 'lucide-react-native';
import { PremiumAvatarBadge } from '@/components/foundation/AppAvatar/PremiumAvatarBadge';
import { View } from 'react-native';
import { toHttpsURL } from '@/utils';
import { useCSSVariable } from 'uniwind';
import { useSelector } from 'react-redux';

interface ProfileSummaryCardProps {
  onEditPress?: () => void;
}

export function ProfileSummaryCard({ onEditPress }: ProfileSummaryCardProps) {
  const { data: me } = useSelector(selectMe);
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const primary = useCSSVariable('--color-primary-v2');
  const accent = typeof primary === 'string' ? primary : '#7c3aed';

  return (
    <View className="overflow-hidden rounded-[28px] border border-primary-v2/25 bg-surface-v2 px-4 py-5">
      <View pointerEvents="none" className="absolute inset-0">
        <Svg key={accent} width="100%" height="100%">
          <Defs>
            <LinearGradient
              id="profileSummaryBackground"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <Stop offset="0" stopColor={accent} stopOpacity={0.08} />
              <Stop offset="1" stopColor={accent} stopOpacity={0.22} />
            </LinearGradient>
          </Defs>
          <Rect
            width="100%"
            height="100%"
            fill="url(#profileSummaryBackground)"
          />
        </Svg>
      </View>
      <AppMountainArtwork className="h-3/4 w-3/5" />

      <View className="flex-row items-center">
        <View className="mr-4 rounded-full border-[3px] border-primary-v2 p-0.5">
          <View className="rounded-full border-2 border-surface-v2">
            <AppAvatar
              size="md"
              name={me?.displayName ?? ''}
              uri={toHttpsURL(me?.avatarUrl) ?? undefined}
            />
          </View>
          <PremiumAvatarBadge />
        </View>

        <View className="flex-1 pr-12">
          <AppText
            variant="xl"
            className="font-bold text-text-v2"
            numberOfLines={1}
          >
            {me?.displayName ?? ''}
          </AppText>
          <AppText
            variant="sm"
            className="mt-1 text-text-muted-v2"
            numberOfLines={2}
          >
            {me?.bio ?? applicationConfig?.profileSummaryQuote}
          </AppText>
        </View>
      </View>

      <AppPressable
        onPress={onEditPress}
        accessibilityRole="button"
        accessibilityLabel="Edit profile"
        className="absolute right-4 top-4 h-11 w-11 items-center justify-center rounded-full border border-primary-v2/20 bg-surface-v2"
      >
        <AppIcon
          icon={Pencil}
          size={18}
          strokeWidth={2.4}
          className="text-link-v2"
        />
      </AppPressable>
    </View>
  );
}
