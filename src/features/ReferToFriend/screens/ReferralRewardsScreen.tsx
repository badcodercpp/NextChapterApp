import {
  AppButton,
  AppPatternArtwork,
  AppIcon,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ArrowRight,
  Crown,
  Gift,
  Info,
  Link2,
  Share2,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  REFERRALS_FOR_REWARD,
  buildInviteMessage,
  buildReferralCode,
  shareText,
} from '../referral';
import { selectMe } from '@/state/selectors';
import { showToast } from '@/components/Toast';
import { useSelector } from 'react-redux';
import { useCSSVariable } from 'uniwind';

const STEPS = [
  {
    id: 'share',
    icon: Link2,
    title: 'Share',
    subtitle: 'Send your referral link or code',
  },
  {
    id: 'join',
    icon: UserPlus,
    title: 'They Join',
    subtitle: 'Your friend signs up',
  },
  {
    id: 'reward',
    icon: Crown,
    title: 'You Both Get Rewards',
    subtitle: 'Unlock premium benefits together',
  },
];

const REWARDS = [
  {
    id: 'you',
    icon: Crown,
    tag: 'For You',
    title: 'Premium Access',
    description: 'Get premium for a limited time when your friend joins.',
  },
  {
    id: 'them',
    icon: Gift,
    tag: 'For Them',
    title: 'Premium Access',
    description:
      'Your friend also gets premium benefits to start their wellness journey.',
  },
];

// No referral-tracking API yet, so progress is static.
const REFERRAL_COUNT = 0;

const styles = StyleSheet.create({
  giftTile: {
    width: 84,
    height: 84,
    borderRadius: 22,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '10deg' }],
  },
});

export function ReferralRewardsScreen() {
  const { data: me } = useSelector(selectMe);
  const code = buildReferralCode(me?.displayName);
  const primary = useCSSVariable('--color-primary-v2');
  const secondary = useCSSVariable('--color-secondary');
  const heroColors = [
    typeof primary === 'string' ? primary : '#7c3aed',
    typeof secondary === 'string' ? secondary : '#5b21b6',
  ];
  const progress = Math.min(REFERRAL_COUNT / REFERRALS_FOR_REWARD, 1);

  return (
    <AppScreen
      scroll
      safeArea={false}
      safeTop={false}
      className="bg-background-v2"
      contentClassName="grow bg-background-v2 px-4 pb-8 pt-4"
    >
      <View className="flex-row items-center">
        <View className="flex-1 pr-2">
          <AppText variant="md" className="font-semibold text-primary-v2">
            Outdated.me
          </AppText>
          <AppText variant="4xl" className="mt-2 font-bold text-text-v2">
            Earn Rewards
          </AppText>
          <AppText variant="4xl" className="font-bold text-primary-v2">
            Together 🎁
          </AppText>
        </View>
        <View className="h-36 w-36 items-center justify-center">
          <View className="absolute h-32 w-32 rounded-full bg-primary-v2/30" />
          <View className="absolute h-20 w-20 rounded-full bg-primary-v2/40" />
          <View style={styles.giftTile}>
            <LinearGradient
              colors={heroColors}
              style={StyleSheet.absoluteFill}
            />
            <AppIcon icon={Gift} size={44} className="text-on-primary-v2" />
            <View className="absolute bottom-2">
              <AppIcon icon={Crown} size={16} className="text-on-primary-v2" />
            </View>
          </View>
          <View className="absolute right-2 top-3">
            <AppIcon icon={Sparkles} size={16} className="text-primary-v2" />
          </View>
          <View className="absolute bottom-3 left-1">
            <AppIcon icon={Sparkles} size={12} className="text-primary-v2" />
          </View>
        </View>
      </View>
      <AppText variant="md" className="mt-3 text-text-muted-v2">
        Invite friends to join{' '}
        <AppText variant="md" className="font-semibold text-text-v2">
          Outdated.me
        </AppText>{' '}
        and unlock premium benefits for both of you.
      </AppText>

      <View className="mt-5 overflow-hidden rounded-3xl border border-primary-v2/25 bg-primary-v2/10 p-4">
        <AppPatternArtwork
          variant="waves"
          className="h-2/3 w-full"
          icon={Share2}
          iconClassName="bottom-auto -top-2 right-3"
        />
        <AppText variant="xl" className="font-bold text-text-v2">
          How It Works
        </AppText>
        <View className="mt-3 flex-row items-start">
          {STEPS.map((step, index) => (
            <View key={step.id} className="flex-1 flex-row items-start">
              <View className="flex-1 items-center">
                <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary-v2/30">
                  <AppIcon
                    icon={step.icon}
                    size={26}
                    className="text-primary-v2"
                  />
                </View>
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
              {index < STEPS.length - 1 && (
                <View className="h-14 justify-center">
                  <AppIcon
                    icon={ArrowRight}
                    size={16}
                    className="text-primary-v2"
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View className="mt-4 overflow-hidden rounded-3xl border border-primary-v2/25 bg-primary-v2/10 p-4">
        <AppPatternArtwork
          variant="sparkles"
          className="bottom-auto top-0 h-20 w-28"
        />
        <AppText variant="xl" className="mb-3 font-bold text-text-v2">
          Your Rewards
        </AppText>
        {REWARDS.map((reward, index) => (
          <View
            key={reward.id}
            className="mb-2 flex-row items-center overflow-hidden rounded-2xl border border-primary-v2/30 bg-primary-v2/10 p-3"
          >
            <AppPatternArtwork
              variant={index === 0 ? 'rings' : 'bubbles'}
              className="w-2/5"
              icon={index === 0 ? Crown : Users}
              iconClassName="right-24"
            />
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary-v2/30">
              <AppIcon
                icon={reward.icon}
                size={26}
                className="text-primary-v2"
              />
            </View>
            <View className="ml-3 flex-1">
              <AppText variant="md" className="font-semibold text-text-v2">
                {reward.title}
              </AppText>
              <AppText variant="sm" className="text-text-muted-v2">
                {reward.description}
              </AppText>
            </View>
            <View className="self-start rounded-full bg-primary-v2 px-3 py-1">
              <AppText
                variant="xs"
                className="font-semibold text-on-primary-v2"
              >
                {reward.tag}
              </AppText>
            </View>
          </View>
        ))}
      </View>

      <View className="mt-4 overflow-hidden rounded-3xl border border-primary-v2/25 bg-primary-v2/10 p-4">
        <AppPatternArtwork
          variant="stripes"
          className="bottom-auto top-0 h-16 w-1/3"
        />
        <View className="mb-3 flex-row items-center justify-between">
          <AppText variant="xl" className="font-bold text-text-v2">
            Referral Progress
          </AppText>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="How referral rewards work"
            hitSlop={12}
            onPress={() =>
              showToast(
                `A referral counts when a friend signs up with your link or code. Refer ${REFERRALS_FOR_REWARD} friends to unlock 1 month of Premium.`,
                'info',
              )
            }
          >
            <AppIcon icon={Info} size={22} className="text-text-muted-v2" />
          </AppPressable>
        </View>
        <View className="rounded-2xl border border-primary-v2/30 bg-primary-v2/10 p-4">
          <View className="absolute bottom-3 right-3">
            <AppIcon icon={Crown} size={48} className="text-primary-v2" />
          </View>
          <AppText variant="md" className="text-text-muted-v2">
            <AppText variant="2xl" className="font-bold text-primary-v2">
              {REFERRAL_COUNT}
            </AppText>
            <AppText variant="2xl" className="text-text-muted-v2">
              {' / '}
            </AppText>
            <AppText variant="2xl" className="font-bold text-primary-v2">
              {REFERRALS_FOR_REWARD}
            </AppText>
            {'  referrals'}
          </AppText>
          <View className="mr-16 mt-2 h-2.5 overflow-hidden rounded-full bg-primary-v2/15">
            <View
              className="h-full rounded-full bg-primary-v2"
              style={{ width: `${progress * 100}%` }}
            />
          </View>
          <AppText variant="sm" className="mt-3 pr-14 text-text-muted-v2">
            Refer {REFERRALS_FOR_REWARD} friends to get 1 month of Premium! 🎉
          </AppText>
        </View>
      </View>

      <View className="mt-5">
        <AppButton
          title="Invite Friends"
          size="lg"
          fullWidth
          leftIcon={Share2}
          onPress={() => shareText(buildInviteMessage(code))}
        />
      </View>
    </AppScreen>
  );
}
