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
            <AppIcon icon={Bell} size={34} className="text-white" />
          </View>
          <AppText
            variant="3xl"
            className="mt-5 text-center font-bold text-login-text"
          >
            Stay on track with
          </AppText>
          <AppText
            variant="3xl"
            className="text-center font-bold text-login-link"
          >
            gentle reminders
          </AppText>
          <AppText
            variant="sm"
            className="mt-3 text-center leading-body text-login-muted"
          >
            We'll send you kind, timely reminders to help you reflect, heal and
            grow.
          </AppText>
        </View>

        <View className="rounded-3xl border border-login-border bg-login-surface px-4">
          {REMINDER_BENEFITS.map((benefit, index) => (
            <View key={benefit.title}>
              {index > 0 && <View className="h-px bg-login-border" />}
              <View className="flex-row items-start py-4">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-login-input">
                  <AppIcon
                    icon={benefit.icon}
                    size={21}
                    className="text-login-link"
                  />
                </View>
                <View className="ml-3 flex-1">
                  <AppText
                    variant="md"
                    className="font-semibold text-login-text"
                  >
                    {benefit.title}
                  </AppText>
                  <AppText variant="sm" className="mt-1 text-login-muted">
                    {benefit.description}
                  </AppText>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-4 rounded-3xl border border-login-border bg-login-surface p-4">
          <View className="flex-row items-center justify-between">
            <View className="mr-3 flex-1 flex-row items-center">
              <AppIcon icon={Bell} size={20} className="text-login-link" />
              <AppText
                variant="md"
                className="ml-3 flex-1 font-semibold text-login-text"
              >
                Gentle reminders
              </AppText>
            </View>
            <Switch
              accessibilityLabel="Receive gentle reminders"
              value={enabled}
              onValueChange={setEnabled}
              trackColorOnClassName="accent-login-primary"
              trackColorOffClassName="accent-login-border"
              thumbColorClassName="accent-switch-thumb"
            />
          </View>
          <AppText variant="sm" className="mt-2 text-login-muted">
            Would you like to receive gentle reminders? You can turn this off
            anytime in settings.
          </AppText>
        </View>

        <View className="mt-auto pt-6">
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Continue"
            className="min-h-14 flex-row items-center justify-center rounded-2xl bg-login-primary px-4 py-4"
            onPress={submitReminder}
          >
            <AppText variant="lg" className="font-semibold text-white">
              Continue
            </AppText>
            <View className="ml-3">
              <AppIcon icon={ArrowRight} size={22} className="text-white" />
            </View>
          </AppPressable>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Maybe later"
            className="mt-2 min-h-11 items-center justify-center py-2"
            onPress={skipReminder}
          >
            <AppText variant="sm" className="font-semibold text-login-link">
              Maybe later
            </AppText>
          </AppPressable>
          <View className="mt-2 flex-row items-center justify-center">
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
