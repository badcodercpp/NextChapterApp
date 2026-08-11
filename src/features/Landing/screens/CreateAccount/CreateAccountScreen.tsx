import {
  AppButton,
  AppIcon,
  AppInput,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import { ArrowRight, Info, Lock, LogIn, Mail, User } from 'lucide-react-native';
import { ImageBackground, ScrollView, View } from 'react-native';

import { LandingNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export function CreateAccountScreen() {
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
            Create your
            <AppText variant="4xl" className="text-primary">
              {' '}
              account
            </AppText>
          </AppText>

          <AppText
            variant="sm"
            className="mt-2 text-center text-text-secondary"
          >
            Start your healing journey with NextChapter.
          </AppText>

          <AppText variant="sm" className="text-center text-text-secondary">
            It's quick, simple and secure.
          </AppText>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="">
            <AppButton
              title="Continue with Google"
              size="lg"
              leftIcon={LogIn}
              fullWidth
              className="mb-0"
              onPress={() => {}}
            />
          </View>

          <View className="mb-4 mt-6 flex-row items-center">
            <View className="h-px flex-1 bg-divider" />

            <AppText
              variant="md"
              className="mx-2 uppercase tracking-widest text-text-secondary"
            >
              Or sign up with email
            </AppText>

            <View className="h-px flex-1 bg-divider" />
          </View>

          <View>
            <AppText variant="sm" className="mb-1 px-2 text-text">
              Full name
            </AppText>
            <AppInput
              placeholder="Enter your full name"
              startIcon={User}
              className="mb-4"
            />

            <AppText variant="sm" className="mb-1 px-2 text-text">
              Email address
            </AppText>

            <AppInput
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              startIcon={Mail}
              className="mb-2"
            />

            <View className="mb-4 flex-row items-center">
              <AppPressable className="mr-2">
                <AppIcon icon={Info} size={16} className="text-primary" />
              </AppPressable>

              <AppText variant="sm" className="flex-1 text-text-secondary">
                We will send verification code to this email
              </AppText>
            </View>
          </View>

          <AppButton
            title="Continue"
            size="lg"
            rightIcon={ArrowRight}
            fullWidth
            onPress={() => {
              navigation.navigate('CreatePassword');
            }}
          />
        </ScrollView>
        <View className=" bg-background pt-2">
          <View className="mt-2 flex-row items-center justify-center">
            <AppText variant="xl" className="text-text-secondary">
              Already have an account?
            </AppText>

            <AppPressable
              className="ml-2"
              onPress={() => navigation.navigate('Login')}
            >
              <AppText
                variant="xl"
                className="font-semibold text-primary underline"
              >
                Log in
              </AppText>
            </AppPressable>
          </View>
          <View className="mt-1 flex-row justify-center items-center">
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
