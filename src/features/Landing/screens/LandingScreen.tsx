import { AppButton, AppText } from '@/components';
import { Image, ImageBackground, Pressable, View } from 'react-native';

import { ArrowRightIcon } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export function LandingScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#141129]">
      {/* Bottom Artwork */}
      <ImageBackground
        source={require('@/assets/images/landing-background.png')}
        resizeMode="cover"
        className="absolute bottom-0 left-0 right-0 h-[300px] w-full"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
        }}
      >
        <LinearGradient
          colors={['#141129', 'rgba(20,17,41,0.75)', 'transparent']}
          locations={[0, 0.2, 0.45, 1]}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </ImageBackground>

      <View className="flex-1 justify-between">
        {/* ================= HERO ================= */}

        <View className="items-center px-8 pt-10">
          {/* Logo */}

          <View className="h-28 w-28 items-center justify-center rounded-full bg-[#13263E]">
            <Image
              source={require('@/assets/images/logo.png')}
              resizeMode="contain"
              className="h-20 w-20"
            />
          </View>

          {/* Brand */}

          <View className="mt-8 items-center">
            <AppText variant="h1" className="text-[54px] font-bold text-white">
              NextChapter
            </AppText>

            <AppText
              variant="caption"
              className="mt-2 uppercase tracking-[3px] text-[#B7B2D7]"
            >
              AI RECOVERY COMPANION
            </AppText>
          </View>

          {/* Headline */}

          <View className="mt-20 items-center">
            <AppText
              variant="h2"
              className="text-center text-[22px] font-medium leading-[38px] text-white"
            >
              Every ending is the beginning of
            </AppText>

            <AppText
              variant="h2"
              className="mt-2 text-center text-[22px] font-medium leading-[38px] text-white"
            >
              your next chapter.
            </AppText>

            <AppText
              variant="body"
              className="mt-[30px] text-[17px] text-[#9087B8]"
            >
              Heal • Grow • Move Forward
            </AppText>
          </View>
        </View>

        {/* ================= CTA ================= */}

        <View className="px-6 pb-10">
          <AppButton
            title="Begin Your Journey"
            variant="primary"
            rightIcon={ArrowRightIcon}
            size="lg"
            fullWidth
            onPress={() => {
              // navigation.navigate('Onboarding')
            }}
          />

          {/* Login */}

          <View className="mt-7 flex-row items-center justify-center">
            <AppText variant="body" className="text-[17px] text-[#A39CBF]">
              Already have an account?
            </AppText>

            <Pressable onPress={() => navigation.navigate('Login' as never)}>
              <AppText
                variant="body"
                className="ml-1.5 text-[17px] font-bold text-white"
              >
                Log In
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
