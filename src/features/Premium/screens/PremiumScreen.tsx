import {
  APP_PATTERN_ARTWORK_VARIANTS,
  AppHeroArtwork,
  AppIcon,
  AppLoadingModal,
  AppMountainArtwork,
  AppPatternArtwork,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Crown,
  Flower2,
  Heart,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Sun,
} from 'lucide-react-native';
import { BENEFITS, HIGHLIGHTS } from '@/features/Premium/constants/plans';
import { StyleSheet, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { AccessLevel, useMyAccessQuery } from '@/__generated__/graphql';
import { cn } from '@/utils';
import { useCallback } from 'react';
import { useCSSVariable } from 'uniwind';
import { useFocusEffect } from '@react-navigation/native';
import { usePlan } from '@/features/Premium/hooks/usePlan';
import { useState } from 'react';

const PLAN_ARTWORK_ICONS = [Sun, Sprout, Heart, Flower2, Sparkles, Star, Crown];

export function PremiumScreen() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const primary = useCSSVariable('--color-primary-v2');
  const accent =
    typeof primary === 'string' && /^#[0-9a-f]{6}$/i.test(primary)
      ? primary
      : '#7c3aed';

  const { isPending, availablePlans, handlePurchase } = usePlan();
  const { data: accessData, isFetching, isError, refetch } = useMyAccessQuery();
  const access = accessData?.myAccess;
  const subscribedPlanId =
    access?.level === AccessLevel.Premium ? access.premiumPlanId : null;
  const canChoose =
    !!access &&
    !isFetching &&
    !isError &&
    (access.level !== AccessLevel.Premium || !!subscribedPlanId);

  const refreshAccess = useCallback(() => {
    refetch()
      .unwrap()
      .catch(error => console.error('Unable to refresh access:', error));
  }, [refetch]);
  useFocusEffect(refreshAccess);

  const plans = availablePlans ?? [];
  const purchasablePlans = canChoose
    ? plans.filter(plan => plan.id !== subscribedPlanId)
    : [];
  const selectedPlan =
    purchasablePlans.find(plan => plan.id === selectedPlanId) ??
    purchasablePlans[0];
  const comparablePlans = plans.filter(
    plan =>
      plan.currency === 'INR' &&
      plan.durationDays > 0 &&
      plan.payableAmount >= 0,
  );
  const bestValue = comparablePlans.reduce<(typeof plans)[number] | undefined>(
    (best, plan) =>
      !best ||
      plan.payableAmount / plan.durationDays <
        best.payableAmount / best.durationDays
        ? plan
        : best,
    undefined,
  );
  const bestValueIsUnique =
    bestValue &&
    comparablePlans.length > 1 &&
    comparablePlans.filter(
      plan =>
        plan.payableAmount * bestValue.durationDays ===
        bestValue.payableAmount * plan.durationDays,
    ).length === 1;
  const formatPrice = (amount: number) =>
    `₹${(amount / 100).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    })}`;

  return (
    <>
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
            <LinearGradient
              colors={[`${accent}00`, `${accent}22`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
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
                <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary-v2/10">
                  <AppIcon
                    icon={item.icon}
                    size={26}
                    className="text-link-v2"
                  />
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
            {!canChoose && (
              <View className="mb-2">
                <AppText variant="sm" className="text-text-muted-v2">
                  {isFetching || (!access && !isError)
                    ? 'Checking your current plan...'
                    : 'Unable to verify your current plan.'}
                </AppText>
                {!isFetching && (isError || access) && (
                  <AppPressable
                    accessibilityRole="button"
                    accessibilityLabel="Retry checking your plan"
                    onPress={refreshAccess}
                    className="self-start py-2"
                  >
                    <AppText
                      variant="sm"
                      className="font-semibold text-link-v2"
                    >
                      Retry
                    </AppText>
                  </AppPressable>
                )}
              </View>
            )}
            {plans.map((plan, index) => {
              const active = plan.id === selectedPlan?.id;
              const subscribed = plan.id === subscribedPlanId;
              const disabled = subscribed || !canChoose;
              const isBestValue = bestValueIsUnique && plan.id === bestValue.id;
              const hasDiscount = plan.payableAmount < plan.baseAmount;
              const price = formatPrice(plan.payableAmount);
              const duration = `${plan.durationDays} ${
                plan.durationDays === 1 ? 'day' : 'days'
              }`;
              return (
                <View
                  key={plan.id}
                  className={cn('relative mb-3', isBestValue ? 'pt-4' : 'pt-2')}
                >
                  <AppPressable
                    accessibilityRole={subscribed ? 'button' : 'radio'}
                    accessibilityState={{
                      disabled,
                      ...(subscribed
                        ? {}
                        : { checked: active, selected: active }),
                    }}
                    accessibilityLabel={`${
                      plan.name
                    }, ${price}, full access for ${duration}${
                      isBestValue ? ', best value' : ''
                    }${subscribed ? ', subscribed' : ''}`}
                    disabled={disabled}
                    disabledOpacity={1}
                    onPress={() => {
                      if (!disabled) {
                        setSelectedPlanId(plan.id);
                      }
                    }}
                    className={cn(
                      'overflow-hidden rounded-[20px] border bg-surface-v2 px-3 py-3',
                      active ? 'border-primary-v2' : 'border-primary-v2/25',
                    )}
                  >
                    <LinearGradient
                      colors={[`${accent}00`, `${accent}18`]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={StyleSheet.absoluteFill}
                    />
                    <AppPatternArtwork
                      variant={
                        APP_PATTERN_ARTWORK_VARIANTS[
                          index % APP_PATTERN_ARTWORK_VARIANTS.length
                        ]
                      }
                      icon={
                        PLAN_ARTWORK_ICONS[index % PLAN_ARTWORK_ICONS.length]
                      }
                      className="w-2/5"
                      iconClassName="right-0 bottom-0"
                    />
                    <View className="flex-row items-start">
                      <View className="flex-1">
                        <AppText
                          variant="lg"
                          className="font-bold text-text-v2"
                        >
                          {plan.name}
                        </AppText>
                        <View className="mt-1 flex-row items-center">
                          <AppIcon
                            icon={CalendarDays}
                            size={14}
                            className="text-link-v2"
                          />
                          <AppText
                            variant="xs"
                            className="ml-1.5 text-text-muted-v2"
                          >
                            Full access for {duration}
                          </AppText>
                        </View>
                        <View className="mt-2 flex-row flex-wrap items-center">
                          {hasDiscount && (
                            <AppText
                              variant="sm"
                              className="mr-2 text-text-muted-v2 line-through"
                            >
                              {formatPrice(plan.baseAmount)}
                            </AppText>
                          )}
                          <View className="rounded-xl bg-primary-v2/15 px-2 py-1">
                            <AppText
                              variant="xl"
                              className="font-bold text-link-v2"
                            >
                              {price}
                            </AppText>
                          </View>
                        </View>
                      </View>
                      <View className="ml-2 items-end">
                        {hasDiscount && plan.discountPercentage > 0 && (
                          <View className="rounded-full bg-primary-v2 px-2 py-1">
                            <AppText
                              variant="xs"
                              className="font-semibold text-on-primary-v2"
                            >
                              {plan.discountPercentage}% Off
                            </AppText>
                          </View>
                        )}
                        {subscribed ? (
                          <View className="mt-2 rounded-full bg-primary-v2/15 px-2 py-1">
                            <AppText
                              variant="xs"
                              className="font-semibold text-link-v2"
                            >
                              Subscribed
                            </AppText>
                          </View>
                        ) : (
                          <View
                            testID="plan-radio"
                            accessible={false}
                            className={cn(
                              'mt-2 h-6 w-6 items-center justify-center rounded-full border-2',
                              active
                                ? 'border-primary-v2'
                                : 'border-text-muted-v2',
                            )}
                          >
                            {active && (
                              <View className="h-3 w-3 rounded-full bg-primary-v2" />
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                  </AppPressable>
                  {isBestValue && (
                    <View
                      pointerEvents="none"
                      accessible={false}
                      className="absolute left-4 top-0 z-10 flex-row items-center rounded-lg bg-primary-v2 px-2 py-1"
                    >
                      <AppIcon
                        icon={Crown}
                        size={13}
                        className="text-on-primary-v2"
                      />
                      <AppText
                        variant="xs"
                        className="ml-1 font-semibold text-on-primary-v2"
                      >
                        Best Value
                      </AppText>
                    </View>
                  )}
                </View>
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
            accessibilityState={{ disabled: !selectedPlan }}
            className="h-14 flex-row items-center justify-center rounded-2xl bg-primary-v2"
            disabled={!selectedPlan}
            onPress={() => {
              if (selectedPlan) {
                handlePurchase(selectedPlan.id);
              }
            }}
          >
            <AppText
              variant="lg"
              className="mr-3 font-semibold text-on-primary-v2"
            >
              Upgrade to Premium
            </AppText>
            <AppIcon
              icon={ArrowRight}
              size={22}
              className="text-on-primary-v2"
            />
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
      <AppLoadingModal
        visible={isPending}
        message="Please wait fetching plans ..."
      />
    </>
  );
}
