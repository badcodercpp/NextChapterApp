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
      className="bg-background-v2"
      contentClassName="grow items-center bg-background-v2 px-5 pb-6 pt-2"
    >
      <View className="w-full max-w-md flex-1">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center rounded-full border border-border-v2 bg-surface-v2"
          onPress={() => navigation.goBack()}
        >
          <AppIcon icon={ChevronLeft} size={22} className="text-text-v2" />
        </AppPressable>

        <View className="items-center pb-6 pt-5">
          <View className="h-20 w-20 items-center justify-center rounded-3xl bg-primary-v2">
            <AppIcon icon={Sprout} size={34} className="text-on-primary-v2" />
          </View>
          <AppText
            variant="3xl"
            className="mt-5 text-center font-bold text-text-v2"
          >
            Your recovery starts
          </AppText>
          <AppText variant="3xl" className="text-center font-bold text-link-v2">
            today
          </AppText>
          <AppText
            variant="sm"
            className="mt-3 text-center leading-body text-text-muted-v2"
          >
            Every small step you take today builds a stronger, happier you.
          </AppText>
        </View>

        <View className="flex-row items-center rounded-3xl border border-border-v2 bg-surface-v2 p-4">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-input-v2">
            <AppIcon icon={CalendarDays} size={24} className="text-link-v2" />
          </View>
          <View className="mx-3 flex-1">
            <AppText variant="lg" className="font-semibold text-text-v2">
              Day 1
            </AppText>
            <AppText variant="sm" className="mt-1 text-text-muted-v2">
              The first day of your new beginning
            </AppText>
          </View>
          <View className="max-w-24 items-center">
            <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-primary-v2 bg-input-v2">
              <AppText variant="xl" className="font-semibold text-text-v2">
                1
              </AppText>
            </View>
            {applicationConfig?.totalProgramDays != null && (
              <AppText
                variant="xs"
                className="mt-2 text-center text-text-muted-v2"
              >
                of {applicationConfig.totalProgramDays} days
              </AppText>
            )}
          </View>
        </View>

        <View className="mt-4 flex-row items-stretch gap-3">
          <View className="flex-1 rounded-3xl border border-border-v2 bg-surface-v2 p-4">
            <View className="mb-3 h-10 w-10 items-center justify-center rounded-xl bg-input-v2">
              <AppIcon icon={Target} size={23} className="text-link-v2" />
            </View>
            <AppText variant="md" className="font-semibold text-text-v2">
              Focus
            </AppText>
            <AppText variant="sm" className="mt-2 text-text-muted-v2">
              One day, one step, one better you.
            </AppText>
          </View>
          <View className="flex-1 rounded-3xl border border-border-v2 bg-surface-v2 p-4">
            <View className="mb-3 h-10 w-10 items-center justify-center rounded-xl bg-input-v2">
              <AppIcon icon={Heart} size={23} className="text-link-v2" />
            </View>
            <AppText variant="md" className="font-semibold text-text-v2">
              You're not alone
            </AppText>
            <AppText variant="sm" className="mt-2 text-text-muted-v2">
              We're with you, every step of the way.
            </AppText>
          </View>
        </View>

        <View className="mt-4 flex-row items-center rounded-3xl border border-border-v2 bg-surface-v2 p-4">
          <View className="mr-3 flex-1">
            <AppText variant="md" className="font-semibold text-text-v2">
              Healing is not a race.
            </AppText>
            <AppText variant="sm" className="mt-2 text-link-v2">
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
            className="min-h-14 flex-row items-center justify-center rounded-2xl bg-primary-v2 px-4 py-4"
            onPress={() => navigation.navigate('WhatBringsYouHere')}
          >
            <AppText
              variant="lg"
              className="shrink text-center font-semibold text-on-primary-v2"
            >
              Start My Journey
            </AppText>
            <View className="ml-3">
              <AppIcon
                icon={ArrowRight}
                size={22}
                className="text-on-primary-v2"
              />
            </View>
          </AppPressable>
          <View className="mt-4 flex-row items-center justify-center">
            <AppIcon icon={Lock} size={13} className="text-text-muted-v2" />
            <AppText
              variant="xs"
              className="ml-2 text-center text-text-muted-v2"
            >
              Your privacy is our privacy.
            </AppText>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
