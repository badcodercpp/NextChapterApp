import {
  APP_PATTERN_ARTWORK_VARIANTS,
  AppHeroArtwork,
  AppIcon,
  AppMountainArtwork,
  AppPatternArtwork,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  CloudDownload,
  Crown,
  Infinity as InfinityIcon,
  ShieldCheck,
} from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { cn } from '@/utils';
import { showToast } from '@/components/Toast';
import { useCSSVariable } from 'uniwind';
import { useState } from 'react';

type PlanId = 'annual' | 'quarterly' | 'monthly';

const PLANS = [
  {
    id: 'annual' as PlanId,
    name: 'Annual',
    price: '₹2,499',
    period: '/ year',
    perMonth: 'Just ₹208 / month',
    save: 'Save 42%',
    badge: 'Best Value',
  },
  {
    id: 'quarterly' as PlanId,
    name: 'Quarterly',
    price: '₹749',
    period: '/ 3 months',
    perMonth: 'Just ₹250 / month',
    save: 'Save 30%',
  },
  {
    id: 'monthly' as PlanId,
    name: 'Monthly',
    price: '₹349',
    period: '/ month',
  },
];

const HIGHLIGHTS = [
  { icon: InfinityIcon, label: 'Unlimited\nJourneys' },
  { icon: BarChart3, label: 'Deeper\nInsights' },
  { icon: Brain, label: 'AI\nWellness Coach' },
  { icon: CloudDownload, label: 'Offline\nAccess' },
];

const BENEFITS = [
  'Access to all premium journeys',
  'Personalized AI coaching & support',
  'Advanced mood & recovery insights',
  'Export your journal and progress',
  'Cancel anytime',
];

export function PremiumScreen() {
  const [selected, setSelected] = useState<PlanId>('annual');
  const primary = useCSSVariable('--color-primary-v2');
  const accent =
    typeof primary === 'string' && /^#[0-9a-f]{6}$/i.test(primary)
      ? primary
      : '#7c3aed';

  const upgrade = () => {
    const plan = PLANS.find(item => item.id === selected);
    showToast(`${plan?.name} plan selected. Payments are coming soon.`, 'info');
  };

  return (
    <View className="flex-1 bg-background-v2">
      <AppScreen
        scroll
        safeArea={false}
        safeTop={false}
        safeBottom={false}
        className="flex-1 bg-background-v2"
        contentClassName="grow bg-background-v2 px-4 pb-6 pt-4"
      >
        <View className="overflow-hidden rounded-[24px] border border-primary-v2/25 bg-surface-v2 p-4">
          <AppHeroArtwork />
          <View className="flex-row items-center">
            <View className="flex-1">
              <AppText variant="md" className="font-bold text-text-v2">
                Outdated
                <AppText variant="md" className="font-bold text-link-v2">
                  .me
                </AppText>
              </AppText>
              <AppText variant="3xl" className="mt-2 font-bold text-text-v2">
                Unlock Your Complete{' '}
                <AppText variant="3xl" className="font-bold text-link-v2">
                  Wellness
                </AppText>{' '}
                Journey
              </AppText>
            </View>
            <View className="ml-2 h-24 w-24 items-center justify-center rounded-full bg-primary-v2/15">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-primary-v2">
                <AppIcon
                  icon={Crown}
                  size={34}
                  className="text-on-primary-v2"
                />
              </View>
            </View>
          </View>
          <AppText
            variant="sm"
            className="mt-3 max-w-[300px] text-text-muted-v2"
          >
            Get powerful tools, deeper insights, and personalized support to
            heal, grow, and feel your best.
          </AppText>
        </View>

        <View className="mt-5 flex-row justify-between">
          {HIGHLIGHTS.map(item => (
            <View key={item.label} className="w-[22%] items-center">
              <View className="h-14 w-14 items-center justify-center rounded-2xl border border-primary-v2/25 bg-surface-v2">
                <AppIcon icon={item.icon} size={26} className="text-link-v2" />
              </View>
              <AppText
                variant="xs"
                className="mt-2 text-center font-semibold text-text-v2"
              >
                {item.label}
              </AppText>
            </View>
          ))}
        </View>

        <View className="mt-6">
          {PLANS.map((plan, index) => {
            const active = plan.id === selected;
            return (
              <AppPressable
                key={plan.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                accessibilityLabel={`${plan.name} plan`}
                onPress={() => setSelected(plan.id)}
                className={cn(
                  'mb-3 flex-row items-center overflow-hidden rounded-2xl border bg-surface-v2 px-4 py-3',
                  active ? 'border-primary-v2' : 'border-border-v2',
                )}
              >
                {active && (
                  <View
                    pointerEvents="none"
                    className="absolute inset-0 bg-primary-v2/10"
                  />
                )}
                <AppPatternArtwork
                  variant={APP_PATTERN_ARTWORK_VARIANTS[index]}
                  className="w-2/5"
                />
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <AppText variant="xl" className="font-bold text-text-v2">
                      {plan.name}
                    </AppText>
                    {!!plan.badge && (
                      <View className="ml-2 rounded-full bg-primary-v2 px-2.5 py-0.5">
                        <AppText
                          variant="xs"
                          className="font-semibold text-on-primary-v2"
                        >
                          {plan.badge}
                        </AppText>
                      </View>
                    )}
                  </View>
                  <AppText variant="lg" className="mt-1 text-text-v2">
                    {plan.price}{' '}
                    <AppText variant="md" className="text-text-muted-v2">
                      {plan.period}
                    </AppText>
                  </AppText>
                  {!!plan.perMonth && (
                    <View className="mt-1 flex-row items-center">
                      <AppText variant="sm" className="text-text-muted-v2">
                        {plan.perMonth}
                      </AppText>
                      <View className="ml-2 rounded-full border border-primary-v2/40 bg-primary-v2/15 px-2.5 py-0.5">
                        <AppText
                          variant="xs"
                          className="font-semibold text-link-v2"
                        >
                          {plan.save}
                        </AppText>
                      </View>
                    </View>
                  )}
                </View>
                <View
                  className={cn(
                    'h-7 w-7 items-center justify-center rounded-full border-2',
                    active ? 'border-primary-v2' : 'border-text-muted-v2',
                  )}
                >
                  {active && (
                    <View className="h-3.5 w-3.5 rounded-full bg-primary-v2" />
                  )}
                </View>
              </AppPressable>
            );
          })}
        </View>

        <View className="mt-1 overflow-hidden rounded-2xl border border-primary-v2/25 bg-surface-v2 p-4">
          <LinearGradient
            colors={[`${accent}00`, `${accent}33`]}
            start={{ x: 0.4, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <AppMountainArtwork className="h-1/2 w-1/2" />
          <AppText variant="lg" className="mb-2 font-bold text-text-v2">
            Everything in Premium
          </AppText>
          {BENEFITS.map(benefit => (
            <View key={benefit} className="my-1.5 flex-row items-center">
              <View className="h-6 w-6 items-center justify-center rounded-full bg-primary-v2/20">
                <AppIcon
                  icon={Check}
                  size={14}
                  strokeWidth={3}
                  className="text-link-v2"
                />
              </View>
              <AppText variant="md" className="ml-3 text-text-v2">
                {benefit}
              </AppText>
            </View>
          ))}
        </View>
      </AppScreen>

      <View className="bg-background-v2 px-4 pb-6 pt-2">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Upgrade to Premium"
          className="h-14 flex-row items-center justify-center rounded-2xl bg-primary-v2"
          onPress={upgrade}
        >
          <AppText
            variant="lg"
            className="mr-3 font-semibold text-on-primary-v2"
          >
            Upgrade to Premium
          </AppText>
          <AppIcon icon={ArrowRight} size={22} className="text-on-primary-v2" />
        </AppPressable>
        <View className="mt-3 flex-row items-center justify-center">
          <AppIcon
            icon={ShieldCheck}
            size={18}
            className="text-text-muted-v2"
          />
          <AppText variant="sm" className="ml-2 text-text-muted-v2">
            Secure payment • Cancel anytime
          </AppText>
        </View>
      </View>
    </View>
  );
}
