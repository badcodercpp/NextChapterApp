import {
  AppAuthenticatedLayout,
  AppButton,
  AppCard,
  AppIcon,
  AppText,
} from '@/components';

import { ArrowRight, BadgeCheck, Heart, Sparkles } from 'lucide-react-native';
import React from 'react';
import { SessionProgress } from '../components';
import { View } from 'react-native';
import { useTabNavigation } from '@/navigation/Tab/hooks/useTabNavigation';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';
import { HomeRoutes } from '@/features/home/navigation/HomeRoutes';

export function DailySessionCompleteStepScreen() {
  const navigation = useTabNavigation();
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-5">
        <SessionProgress currentStep={'COMPLETED'} />
      </View>
      <View className="mt-6">
        <AppCard className="items-center overflow-hidden rounded-[28px] border border-primary-v2/40 bg-background-v2 px-5 py-7">
          <View
            pointerEvents="none"
            className="absolute inset-0 bg-primary-v2/10"
          />
          <View
            pointerEvents="none"
            className="absolute -bottom-24 -right-12 h-40 w-64 rounded-full bg-primary-v2/15"
          />
          <View className="h-20 w-20 items-center justify-center rounded-full bg-primary-v2/20">
            <AppIcon icon={BadgeCheck} size={56} className="text-link-v2" />
           
          </View>
          <AppText
            variant="xs"
            className="mt-4 text-center font-semibold uppercase tracking-widest text-link-v2"
          >
            Daily session complete
          </AppText>
          <AppText
            variant="xl"
            className="mt-3 max-w-[280px] text-center font-bold leading-8 text-text-v2"
          >
            You showed up for yourself today.
          </AppText>
          <AppText
            variant="sm"
            className="mt-3 max-w-[290px] text-center leading-6 text-text-muted-v2"
          >
            Take a moment to recognize the care and effort you put into your
            healing.
          </AppText>
        </AppCard>
      </View>

      <View className="mt-4">
        <AppCard className="overflow-hidden rounded-[24px] border border-primary-v2/30 bg-background-v2 p-4">
          <View
            pointerEvents="none"
            className="absolute inset-0 bg-primary-v2/10"
          />
          <View className="flex-row items-center">
            <View className="h-11 w-11 items-center justify-center rounded-[14px] bg-primary-v2/20">
              <AppIcon icon={Sparkles} size={26} className="text-link-v2" />
            </View>
            <View className="ml-3 flex-1 border-l border-primary-v2/30 pl-3">
              <AppText variant="md" className="font-semibold text-link-v2">
                A moment worth noticing
              </AppText>
              <AppText
                variant="sm"
                className="mt-1 leading-5 text-text-muted-v2"
              >
                You made space to reflect, explore what matters, and take one
                thoughtful step forward.
              </AppText>
            </View>
          </View>
        </AppCard>
      </View>

      <View className="mt-4">
        <AppCard className="rounded-[24px] border border-primary-v2/25 bg-background-v2 p-4">
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-primary-v2/15">
              <AppIcon icon={Heart} size={24} className="text-success" />
            </View>
            <AppText
              variant="sm"
              className="ml-3 flex-1 border-l border-primary-v2/30 pl-3 leading-5 text-text-v2"
            >
              Progress is not always visible, but every small step still
              matters.
            </AppText>
          </View>
        </AppCard>
        <View className="mt-5 mb-8">
          <AppButton
            title="Finish"
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={ArrowRight}
            className="rounded-[20px] bg-primary-v2"
            onPress={() =>
              navigation.navigate(TabRoutes.Home, { screen: HomeRoutes.Home })
            }
          />
        </View>
      </View>
    </AppAuthenticatedLayout>
  );
}
