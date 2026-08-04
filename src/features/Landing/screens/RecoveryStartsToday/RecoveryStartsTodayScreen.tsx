import { AppButton, AppCard, AppIcon, AppScreen, AppText } from '@/components';
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Lock,
  Target,
} from 'lucide-react-native';
import { Image, ImageBackground, ScrollView, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export function RecoveryStartsTodayScreen() {
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
        <View className="mt-4 items-center mb-8">
          <AppText
            variant="4xl"
            className="text-center text-text"
            numberOfLines={2}
          >
            Your recovery starts
            <AppText variant="3xl" className="text-primary">
              {' '}
              today
            </AppText>
          </AppText>

          <AppText
            variant="sm"
            className="mt-1 text-center text-text-secondary"
          >
            Every small step you take today
          </AppText>

          <AppText variant="sm" className="text-center text-text-secondary">
            builds a stronger, happier you.
          </AppText>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <AppCard className="flex-row items-center rounded-2xl border border-border bg-surface p-4">
            <AppIcon icon={CalendarDays} size={30} className="text-primary" />

            <View className="flex-1 ml-4">
              <AppText variant="xl" className="text-text">
                Day 1
              </AppText>

              <AppText
                variant="sm"
                className="leading-caption text-text-secondary"
              >
                The first day of your
              </AppText>

              <AppText
                variant="sm"
                className="leading-caption text-text-secondary"
              >
                new beginning
              </AppText>
            </View>

            <View className="items-center">
              <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-primary">
                <AppText variant="xl" className="text-text">
                  1
                </AppText>
              </View>

              <AppText variant="sm" className="mt-2 text-text-secondary">
                of 90 days
              </AppText>
            </View>
          </AppCard>

          <View className="mt-4 flex-row justify-between">
            <AppCard className="w-[48.5%] rounded-2xl border border-border bg-surface p-5">
              <AppIcon icon={Target} size={30} className="text-primary" />

              <AppText variant="xl" className="text-text mt-1">
                Focus
              </AppText>

              <AppText variant="sm" className="text-text-secondary">
                One day, one step,
              </AppText>

              <AppText variant="sm" className="text-text-secondary">
                one better you.
              </AppText>
            </AppCard>

            <AppCard className="w-[48.5%] rounded-2xl border border-border bg-surface p-4">
              <AppIcon icon={Heart} size={30} className="text-primary" />

              <AppText variant="xl" className="text-text mt-1">
                You're not alone
              </AppText>

              <AppText variant="sm" className="text-text-secondary">
                We're with you,
              </AppText>

              <AppText variant="sm" className="text-text-secondary">
                every step of the way.
              </AppText>
            </AppCard>
          </View>

          <AppCard className="mt-5 overflow-hidden rounded-2xl border border-border bg-surface p-4">
            <View className="flex-row items-center">
              <View className="flex-1">
                <AppText variant="xl" className="text-text">
                  Healing is not a race.
                </AppText>

                <AppText variant="sm" className="text-primary">
                  Be proud of showing up for yourself.
                </AppText>
              </View>

              <Image
                source={require('@/assets/images/landing-background.png')}
                resizeMode="contain"
                className="h-18 w-18 rounded-xl"
              />
            </View>
          </AppCard>
        </ScrollView>

        <View className=" bg-background pt-4">
          <AppButton
            title="Start My Journey"
            size="lg"
            fullWidth
            onPress={() => {
              //   navigation.navigate('MeetYourAI');
            }}
            rightIcon={ArrowRight}
          />

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
