import { AppButton, AppCard, AppIcon, AppScreen, AppText } from '@/components';
import { ArrowRight, Heart, Lock } from 'lucide-react-native';
import { Image, ImageBackground, ScrollView, View } from 'react-native';

import { FEATURES } from '../../constants';
import { LandingNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export function MeetYourAIScreen() {
  const navigation = useNavigation<LandingNavigationProp>();
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
          <AppText variant="4xl" className="text-center text-text">
            Meet your
            <AppText variant="4xl" className="text-primary">
              {' '}
              AI companion
            </AppText>
          </AppText>

          <AppText variant="2xl" className="mt-1 text-primary">
            I'm AJ 💜
          </AppText>

          <AppText
            variant="sm"
            className="mt-1 text-center text-text-secondary"
          >
            I'm here to listen, support and guide you
          </AppText>

          <AppText variant="sm" className="text-center text-text-secondary">
            on your healing journey — one day at a time.
          </AppText>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {FEATURES.map(feature => (
            <AppCard
              key={feature.id}
              className="mb-4 flex-row items-center rounded-2xl border border-border bg-surface p-4"
            >
              <AppIcon icon={feature.icon} size={30} className="text-primary" />

              <View className="flex-1 pr-4 ml-4">
                <AppText variant="xl" className="text-text">
                  {feature.title}
                </AppText>

                <AppText variant="sm" className="text-text-secondary">
                  {feature.description}
                </AppText>
              </View>

              <AppIcon icon={Heart} size={24} className="text-primary" />
            </AppCard>
          ))}

          <AppCard className="mt-2 rounded-2xl border border-border bg-surface p-4">
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
            onPress={() => {
              navigation.navigate('CreateAccount');
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
