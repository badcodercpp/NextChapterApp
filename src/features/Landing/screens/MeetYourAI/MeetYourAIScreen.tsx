import { AppButton, AppCard, AppIcon, AppScreen, AppText } from '@/components';
import { ArrowRight, Heart, Lock } from 'lucide-react-native';
import { Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';

import { FEATURES } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useMeetYourAI } from './useMeetYourAI';

export function MeetYourAIScreen() {
  const { submitMeetYourAI } = useMeetYourAI();

  return (
    <AppScreen
      safeBottom={true}
      safeTop={false}
      className="flex-1 bg-background"
      contentClassName="flex-1 bg-background"
      safeArea={false}
    >
      <View className="h-[150px]">
        <ImageBackground
          source={require('@/assets/images/landing-background.png')}
          resizeMode="cover"
          className="h-[150px] w-full"
        >
          <LinearGradient
            colors={[
              'rgba(46,16,101,0.55)',
              'rgba(46,16,101,0.35)',
              '#141129',
            ]}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
          />
        </ImageBackground>
      </View>
      <View className="flex-1 px-4">
        <View className="mb-4 items-center">
          <AppText variant="4xl" className="text-center font-bold text-text">
            Your Personal
            <AppText variant="4xl" className="font-bold text-primary">
              {' '}
              AI Companion
            </AppText>
          </AppText>

          <AppText
            variant="md"
            className="mt-2 text-center text-text-secondary"
          >
            A supportive, understanding partner for your wellness journey 💜
          </AppText>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {FEATURES.map(feature => (
            <AppCard
              key={feature.id}
              className="mb-3 flex-row items-center rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <AppIcon
                  icon={feature.icon}
                  size={24}
                  className="text-primary"
                />
              </View>

              <View className="ml-3 flex-1 pr-3">
                <AppText variant="lg" className="font-semibold text-text">
                  {feature.title}
                </AppText>

                <AppText variant="sm" className="text-text-secondary">
                  {feature.description}
                </AppText>
              </View>

              <AppIcon icon={Heart} size={22} className="text-primary" />
            </AppCard>
          ))}

          <AppCard className="mt-1 rounded-2xl border border-primary bg-primary/25 p-4">
            <View className="">
              <View className="flex-1 flex-row">
                <View className="flex-2">
                  <AppText variant="md" className="text-text">
                    You don't have to go through this alone. I'm with you.
                  </AppText>
                  <AppText variant="sm" className="mt-1 text-primary">
                    Let's take this one step at a time.
                  </AppText>
                </View>

                <View className="flex-1 justify-end items-end">
                  <Image
                    source={require('@/assets/images/landing-background.png')}
                    resizeMode="contain"
                    className="h-16 w-16 rounded-xl"
                  />
                </View>
              </View>
            </View>
          </AppCard>
        </ScrollView>

        <View className=" bg-background pt-4">
          <AppButton
            title="Continue"
            size="lg"
            fullWidth
            onPress={submitMeetYourAI}
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
