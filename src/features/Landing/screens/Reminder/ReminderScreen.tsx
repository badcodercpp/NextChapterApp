import { AppIcon, AppPressable, AppScreen, AppText } from '@/components';
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronLeft,
  Heart,
  Lock,
  Moon,
} from 'lucide-react-native';
import { Switch, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { useReminder } from './useReminder';
import { useScreenHeader } from '@/navigation/hooks';

const REMINDER_BENEFITS = [
  {
    icon: Heart,
    title: 'Daily check-ins',
    description: 'A gentle nudge to reflect and feel seen, every day.',
  },
  {
    icon: CalendarDays,
    title: 'Stay consistent',
    description: 'Build healthy habits with small, meaningful reminders.',
  },
  {
    icon: Moon,
    title: "You're in control",
    description: 'Choose what you receive and when. You can change it anytime.',
  },
];

export function ReminderScreen() {
  const [enabled, setEnabled] = useState(true);
  const { submitReminder, skipReminder } = useReminder();
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
            <AppIcon icon={Bell} size={34} className="text-on-primary-v2" />
          </View>
          <AppText
            variant="3xl"
            className="mt-5 text-center font-bold text-text-v2"
          >
            Stay on track with
          </AppText>
          <AppText variant="3xl" className="text-center font-bold text-link-v2">
            gentle reminders
          </AppText>
          <AppText
            variant="sm"
            className="mt-3 text-center leading-body text-text-muted-v2"
          >
            We'll send you kind, timely reminders to help you reflect, heal and
            grow.
          </AppText>
        </View>

        <View className="rounded-3xl border border-border-v2 bg-surface-v2 px-4">
          {REMINDER_BENEFITS.map((benefit, index) => (
            <View key={benefit.title}>
              {index > 0 && <View className="h-px bg-border-v2" />}
              <View className="flex-row items-start py-4">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-input-v2">
                  <AppIcon
                    icon={benefit.icon}
                    size={21}
                    className="text-link-v2"
                  />
                </View>
                <View className="ml-3 flex-1">
                  <AppText variant="md" className="font-semibold text-text-v2">
                    {benefit.title}
                  </AppText>
                  <AppText variant="sm" className="mt-1 text-text-muted-v2">
                    {benefit.description}
                  </AppText>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-4 rounded-3xl border border-border-v2 bg-surface-v2 p-4">
          <View className="flex-row items-center justify-between">
            <View className="mr-3 flex-1 flex-row items-center">
              <AppIcon icon={Bell} size={20} className="text-link-v2" />
              <AppText
                variant="md"
                className="ml-3 flex-1 font-semibold text-text-v2"
              >
                Gentle reminders
              </AppText>
            </View>
            <Switch
              accessibilityLabel="Receive gentle reminders"
              value={enabled}
              onValueChange={setEnabled}
              trackColorOnClassName="accent-primary-v2"
              trackColorOffClassName="accent-border-v2"
              thumbColorClassName="accent-switch-thumb"
            />
          </View>
          <AppText variant="sm" className="mt-2 text-text-muted-v2">
            Would you like to receive gentle reminders? You can turn this off
            anytime in settings.
          </AppText>
        </View>

        <View className="mt-auto pt-6">
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Continue"
            className="min-h-14 flex-row items-center justify-center rounded-2xl bg-primary-v2 px-4 py-4"
            onPress={submitReminder}
          >
            <AppText variant="lg" className="font-semibold text-on-primary-v2">
              Continue
            </AppText>
            <View className="ml-3">
              <AppIcon
                icon={ArrowRight}
                size={22}
                className="text-on-primary-v2"
              />
            </View>
          </AppPressable>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Maybe later"
            className="mt-2 min-h-11 items-center justify-center py-2"
            onPress={skipReminder}
          >
            <AppText variant="sm" className="font-semibold text-link-v2">
              Maybe later
            </AppText>
          </AppPressable>
          <View className="mt-2 flex-row items-center justify-center">
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
