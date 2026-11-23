import {
  AppButton,
  AppPatternArtwork,
  AppIcon,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ChevronRight,
  Copy,
  Gift,
  Link2,
  Share2,
  Sparkles,
  Star,
  Ticket,
  UserPlus,
  Users,
} from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ReferToFriendStackParamList } from '../navigation/types';

import {
  DISCOUNT_PERCENT,
  REFERRAL_BASE_URL,
  buildReferralCode,
  shareText,
} from '../referral';
import { selectMe } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useCSSVariable } from 'uniwind';

const STEPS = [
  {
    id: 'share',
    icon: Link2,
    title: 'Share',
    subtitle: 'Send your referral link',
  },
  {
    id: 'join',
    icon: Users,
    title: 'They Join',
    subtitle: 'Your friend signs up',
  },
  {
    id: 'grow',
    icon: Star,
    title: 'You Both Grow',
    subtitle: 'Stay motivated and heal together',
  },
];

function CopyButton({ label, message }: { label: string; message: string }) {
  return (
    <AppPressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className="h-10 w-10 items-center justify-center rounded-xl bg-primary-v2/30"
      onPress={() => shareText(message)}
    >
      <AppIcon icon={Copy} size={18} className="text-text-v2" />
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 80,
    height: 80,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function ReferToFriendScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ReferToFriendStackParamList>>();
  const { data: me } = useSelector(selectMe);
  const referralCode = buildReferralCode(me?.displayName);
  const primary = useCSSVariable('--color-primary-v2');
  const secondary = useCSSVariable('--color-secondary');
  const heroColors = [
    typeof primary === 'string' ? primary : '#7c3aed',
    typeof secondary === 'string' ? secondary : '#5b21b6',
  ];
  const referralLink = `${REFERRAL_BASE_URL}/${referralCode}`;

  const handleInvite = () =>
    shareText(
      `Join me on Outdated.me and let's support each other's wellness journey. Use my code ${referralCode} for ${DISCOUNT_PERCENT}% off: ${referralLink}`,
    );

  return (
    <AppScreen
      scroll
      safeArea={false}
      safeTop={false}
      className="bg-background-v2"
      contentClassName="grow bg-background-v2 px-4 pb-16 pt-4"
    >
      <View className="flex-row items-center">
        <View className="flex-1 pr-3">
          <AppText variant="sm" className="font-semibold text-primary-v2">
            Outdated.me
          </AppText>
          <AppText variant="3xl" className="mt-1 font-bold text-text-v2">
            Refer a Friend
          </AppText>
          <AppText variant="sm" className="mt-2 text-text-muted-v2">
            Invite your friends to Outdated.me and support each other's wellness
            journey.
          </AppText>
        </View>
        <View className="h-28 w-28 items-center justify-center">
          <View className="absolute h-28 w-28 rounded-full bg-primary-v2/25" />
          <View style={styles.tile}>
            <LinearGradient
              colors={heroColors}
              style={StyleSheet.absoluteFill}
            />
            <AppIcon icon={UserPlus} size={40} className="text-on-primary-v2" />
          </View>
          <View className="absolute right-1 top-2">
            <AppIcon icon={Sparkles} size={16} className="text-primary-v2" />
          </View>
        </View>
      </View>

      <View className="mt-6 flex-row overflow-hidden rounded-3xl border border-primary-v2/25 bg-primary-v2/10 py-4">
        <AppPatternArtwork variant="waves" className="h-2/3 w-full" />
        {STEPS.map((step, index) => (
          <View
            key={step.id}
            className={
              index > 0
                ? 'flex-1 items-center border-l border-border-v2 px-2'
                : 'flex-1 items-center px-2'
            }
          >
            <AppIcon icon={step.icon} size={26} className="text-primary-v2" />
            <AppText
              variant="sm"
              className="mt-2 text-center font-semibold text-text-v2"
            >
              {step.title}
            </AppText>
            <AppText
              variant="xs"
              className="mt-1 text-center text-text-muted-v2"
            >
              {step.subtitle}
            </AppText>
          </View>
        ))}
      </View>

      <View className="mt-4 overflow-hidden rounded-3xl border border-primary-v2/25 bg-primary-v2/10 p-4">
        <AppPatternArtwork
          variant="grid"
          className="bottom-auto top-0 h-28 w-2/5"
          icon={Link2}
          iconClassName="bottom-auto top-1 right-3"
        />
        <AppText variant="xl" className="font-bold text-text-v2">
          Your Referral Link
        </AppText>
        <AppText variant="sm" className="mt-1 text-text-muted-v2">
          Share this link or code with your friends.
        </AppText>

        <View className="mt-4 flex-row items-center rounded-2xl border border-border-v2 bg-input-v2 p-2 pl-3">
          <AppIcon icon={Link2} size={20} className="text-primary-v2" />
          <AppText
            variant="sm"
            numberOfLines={1}
            className="mx-3 flex-1 text-text-v2"
          >
            {referralLink}
          </AppText>
          <CopyButton label="Share referral link" message={referralLink} />
        </View>

        <View className="my-4 flex-row items-center">
          <View className="h-px flex-1 bg-border-v2" />
          <AppText variant="sm" className="mx-3 text-text-muted-v2">
            or
          </AppText>
          <View className="h-px flex-1 bg-border-v2" />
        </View>

        <View className="flex-row items-center rounded-2xl border border-border-v2 bg-input-v2 p-2 pl-3">
          <AppIcon icon={Ticket} size={22} className="text-primary-v2" />
          <View className="mx-3 flex-1">
            <AppText variant="xs" className="text-text-muted-v2">
              Referral Code
            </AppText>
            <AppText variant="lg" className="font-bold text-text-v2">
              {referralCode}
            </AppText>
          </View>
          <CopyButton label="Share referral code" message={referralCode} />
        </View>
      </View>

      <View className="mt-4">
        <AppButton
          title="Invite Friends"
          size="lg"
          fullWidth
          leftIcon={Share2}
          onPress={handleInvite}
        />
      </View>

      <AppPressable
        accessibilityRole="button"
        accessibilityLabel="Referral Rewards"
        onPress={() => navigation.navigate('ReferralRewards')}
        className="mt-4 flex-row items-center overflow-hidden rounded-3xl border border-primary-v2/25 bg-primary-v2/10 p-4"
      >
        <AppPatternArtwork
          variant="sparkles"
          className="w-2/5"
          icon={Gift}
          iconClassName="right-12"
        />
        <View className="h-12 w-12 items-center justify-center rounded-xl bg-primary-v2/20">
          <AppIcon icon={Gift} size={26} className="text-primary-v2" />
        </View>
        <View className="ml-3 flex-1">
          <AppText variant="lg" className="font-semibold text-text-v2">
            Referral Rewards
          </AppText>
          <AppText variant="sm" className="text-text-muted-v2">
            Both you and your friend unlock premium benefits.
          </AppText>
        </View>
        <AppIcon icon={ChevronRight} size={22} className="text-text-muted-v2" />
      </AppPressable>
    </AppScreen>
  );
}
