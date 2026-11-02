import { AppIcon, AppPressable, AppScreen, AppText } from '@/components';
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  Heart,
  Lock,
  Sprout,
  Target,
} from 'lucide-react-native';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { selectApplicationConfig } from '@/state/selectors';
import { useScreenHeader } from '@/navigation/hooks';

export function RecoveryStartsTodayScreen() {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const navigation = useNavigation<LandingNavigationProp>();

  useScreenHeader({ headerShown: false });

  return (
    <AppScreen
      scroll
      safeArea={false}
      className="bg-login-background"
      contentClassName="grow items-center bg-login-background px-5 pb-6 pt-2"
    >
      <View className="w-full max-w-md flex-1">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center rounded-full border border-login-border bg-login-surface"
          onPress={() => navigation.goBack()}
        >
          <AppIcon icon={ChevronLeft} size={22} className="text-login-text" />
        </AppPressable>

        <View className="items-center pb-6 pt-5">
          <View className="h-20 w-20 items-center justify-center rounded-3xl bg-login-primary">
            <AppIcon icon={Sprout} size={34} className="text-white" />
          </View>
          <AppText
            variant="3xl"
            className="mt-5 text-center font-bold text-login-text"
          >
            Your recovery starts
          </AppText>
          <AppText
            variant="3xl"
            className="text-center font-bold text-login-link"
          >
            today
          </AppText>
          <AppText
            variant="sm"
            className="mt-3 text-center leading-body text-login-muted"
          >
            Every small step you take today builds a stronger, happier you.
          </AppText>
        </View>

        <View className="flex-row items-center rounded-3xl border border-login-border bg-login-surface p-4">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-login-input">
            <AppIcon
              icon={CalendarDays}
              size={24}
              className="text-login-link"
            />
          </View>
          <View className="mx-3 flex-1">
            <AppText variant="lg" className="font-semibold text-login-text">
              Day 1
            </AppText>
            <AppText variant="sm" className="mt-1 text-login-muted">
              The first day of your new beginning
            </AppText>
          </View>
          <View className="max-w-24 items-center">
            <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-login-primary bg-login-input">
              <AppText variant="xl" className="font-semibold text-login-text">
                1
              </AppText>
            </View>
            {applicationConfig?.totalProgramDays != null && (
              <AppText
                variant="xs"
                className="mt-2 text-center text-login-muted"
              >
                of {applicationConfig.totalProgramDays} days
              </AppText>
            )}
          </View>
        </View>

        <View className="mt-4 flex-row items-stretch gap-3">
          <View className="flex-1 rounded-3xl border border-login-border bg-login-surface p-4">
            <View className="mb-3 h-10 w-10 items-center justify-center rounded-xl bg-login-input">
              <AppIcon icon={Target} size={23} className="text-login-link" />
            </View>
            <AppText variant="md" className="font-semibold text-login-text">
              Focus
            </AppText>
            <AppText variant="sm" className="mt-2 text-login-muted">
              One day, one step, one better you.
            </AppText>
          </View>
          <View className="flex-1 rounded-3xl border border-login-border bg-login-surface p-4">
            <View className="mb-3 h-10 w-10 items-center justify-center rounded-xl bg-login-input">
              <AppIcon icon={Heart} size={23} className="text-login-link" />
            </View>
            <AppText variant="md" className="font-semibold text-login-text">
              You're not alone
            </AppText>
            <AppText variant="sm" className="mt-2 text-login-muted">
              We're with you, every step of the way.
            </AppText>
          </View>
        </View>

        <View className="mt-4 flex-row items-center rounded-3xl border border-login-border bg-login-surface p-4">
          <View className="mr-3 flex-1">
            <AppText variant="md" className="font-semibold text-login-text">
              Healing is not a race.
            </AppText>
            <AppText variant="sm" className="mt-2 text-login-link">
              Be proud of showing up for yourself.
            </AppText>
          </View>
          <Image
            source={require('@/assets/images/landing-background.png')}
            resizeMode="cover"
            className="h-16 w-16 rounded-2xl"
            accessible={false}
          />
        </View>

        <View className="mt-auto pt-6">
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Start My Journey"
            className="min-h-14 flex-row items-center justify-center rounded-2xl bg-login-primary px-4 py-4"
            onPress={() => navigation.navigate('WhatBringsYouHere')}
          >
            <AppText
              variant="lg"
              className="shrink text-center font-semibold text-white"
            >
              Start My Journey
            </AppText>
            <View className="ml-3">
              <AppIcon icon={ArrowRight} size={22} className="text-white" />
            </View>
          </AppPressable>
          <View className="mt-4 flex-row items-center justify-center">
            <AppIcon icon={Lock} size={13} className="text-login-muted" />
            <AppText variant="xs" className="ml-2 text-center text-login-muted">
              Your privacy is our privacy.
            </AppText>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
