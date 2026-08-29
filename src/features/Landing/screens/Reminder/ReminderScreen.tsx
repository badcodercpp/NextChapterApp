import {
  AppButton,
  AppCard,
  AppIcon,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Lock,
  Moon,
} from 'lucide-react-native';
import { ImageBackground, ScrollView, Switch, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useReminder } from './useReminder';
import { useState } from 'react';

export function ReminderScreen() {
  const [enabled, setEnabled] = useState(true);

  const { submitReminder, skipReminder } = useReminder();

  return (
    <AppScreen
      safeBottom={true}
      safeTop={false}
      className="flex-1 bg-background"
      contentClassName="flex-1 bg-background"
      safeArea={false}
    >
      <View className="items-center pt-4 h-[150px]">
        <ImageBackground
          source={require('@/assets/images/landing-background.png')}
          resizeMode="cover"
          className="absolute top-0 left-0 right-0 h-[150px] w-full"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: '100%' }}
        >
          <LinearGradient
            colors={[
              '#141129',
              'rgba(20,17,41,0.75)',
              'transparent',
              'rgba(20,17,41,0.75)',
            ]}
            locations={[0, 0.7, 0.45, 0.2]}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              inset: 0,
            }}
          />
        </ImageBackground>
      </View>
      <View className="flex-1 px-4">
        <View className="mt-4 items-center pb-4">
          <AppText variant="4xl" className="text-center text-text">
            Stay on track with
          </AppText>

          <AppText variant="3xl" className="text-center text-primary">
            gentle reminders
          </AppText>

          <AppText
            variant="sm"
            className="mt-2 text-center text-text-secondary"
          >
            We'll send you kind, timely reminders
          </AppText>

          <AppText variant="sm" className="text-center text-text-secondary">
            to help you reflect, heal and grow.
          </AppText>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <AppCard className="rounded-2xl border border-primary bg-surface p-4">
            <View className="flex-row items-start">
              <AppIcon icon={Heart} size={30} className="mt-1 text-primary" />

              <View className="flex-1 ml-4 mb-4">
                <AppText variant="xl" className="text-text">
                  Daily check-ins
                </AppText>

                <AppText variant="sm" className=" text-text-secondary">
                  A gentle nudge to reflect and feel
                </AppText>

                <AppText variant="sm" className="text-text-secondary">
                  seen, every day.
                </AppText>
              </View>
            </View>

            <View className="h-px bg-divider" />

            <View className="flex-row items-start pt-4">
              <AppIcon
                icon={CalendarDays}
                size={30}
                className="mt-1 text-primary"
              />

              <View className="flex-1 ml-4 mb-4">
                <AppText variant="xl" className="text-text">
                  Stay consistent
                </AppText>

                <AppText variant="sm" className="text-text-secondary">
                  Build healthy habits with small,
                </AppText>

                <AppText variant="sm" className="text-text-secondary">
                  meaningful reminders.
                </AppText>
              </View>
            </View>

            <View className="h-px bg-divider" />

            <View className="flex-row items-start pt-4">
              <AppIcon icon={Moon} size={30} className="mt-1 text-primary" />

              <View className="flex-1 ml-4 mb-4">
                <AppText variant="xl" className="text-text">
                  You're in control
                </AppText>

                <AppText variant="sm" className="text-text-secondary">
                  Choose what you receive and
                </AppText>

                <AppText variant="sm" className="text-text-secondary">
                  when. You can change it anytime.
                </AppText>
              </View>
            </View>
          </AppCard>

          <AppCard className="mt-6 flex-row items-center rounded-2xl border border-border bg-surface px-4">
            <AppIcon icon={Heart} size={30} className="mt-1 text-primary" />

            <View className="flex-1 px-4">
              <AppText variant="xl" className="text-text leading-body">
                Would you like to receive
              </AppText>

              <AppText variant="sm" className="text-text">
                gentle reminders?
              </AppText>

              <AppText variant="sm" className="text-text-secondary">
                You can turn this off anytime in settings.
              </AppText>
            </View>

            <Switch
              value={enabled}
              onValueChange={setEnabled}
              trackColorOnClassName="accent-primary"
              trackColorOffClassName="accent-switch-thumb"
              thumbColorClassName="accent-switch-thumb"
            />
          </AppCard>
        </ScrollView>

        <View className=" bg-background pt-4">
          <AppButton
            title="Continue"
            size="lg"
            fullWidth
            onPress={submitReminder}
            rightIcon={ArrowRight}
          />

          <AppPressable className="mt-2 items-center" onPress={skipReminder}>
            <AppText variant="xl" className="text-primary">
              Maybe later
            </AppText>
          </AppPressable>

          <View className="mt-2 flex-row justify-center items-center">
            <AppIcon icon={Lock} size={16} className="text-primary" />
            <AppText variant="sm" className="px-1 text-center text-text-muted ">
              Your privacy is our privacy.
            </AppText>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
