import {
  AppButton,
  AppCard,
  AppIcon,
  AppInput,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
} from 'lucide-react-native';
import { ImageBackground, ScrollView, View } from 'react-native';

import { LandingNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function LoginScreen() {
  const navigation = useNavigation<LandingNavigationProp>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
        <View className="mt-2 items-center pb-4">
          <AppText variant="4xl" className="text-center text-text">
            Welcome back{' '}
            <AppText variant="4xl" className="text-center text-primary">
              to your journey
            </AppText>
          </AppText>

          <AppText
            variant="sm"
            className="mt-1 text-center text-text-secondary"
          >
            Log in to continue your recovery
          </AppText>

          <AppText variant="sm" className="text-center text-text-secondary">
            and keep moving forward.
          </AppText>
        </View>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-1"
        >
          <AppCard className="mt-4 rounded-3xl border border-primary bg-surface p-4 pt-6">
            <AppText variant="sm" className="mb-1 px-2 text-text">
              Email address
            </AppText>

            <AppInput
              placeholder="Enter your email"
              startIcon={Mail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="mb-6"
            />

            <AppText variant="sm" className="mb-1 px-2 text-text">
              Password
            </AppText>

            <AppInput
              placeholder="Enter your password"
              startIcon={Lock}
              secureTextEntry={!showPassword}
              endIcon={showPassword ? EyeOff : Eye}
              onEndIconPress={() => setShowPassword(!showPassword)}
            />

            <AppPressable
              className="mt-1 self-end"
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <AppText variant="md" className="text-primary underline">
                Forgot password?
              </AppText>
            </AppPressable>

            <AppButton
              title="Log in"
              size="lg"
              rightIcon={ArrowRight}
              fullWidth
              className="mt-4"
              onPress={() => {
                // Login
              }}
            />

            <View className="my-4 flex-row items-center">
              <View className="h-px flex-1 bg-divider" />

              <AppText variant="xl" className="mx-4 text-text-secondary">
                or continue with
              </AppText>

              <View className="h-px flex-1 bg-divider" />
            </View>

            <View className="flex-row justify-between">
              <AppButton
                title="Google"
                size="lg"
                leftIcon={LogIn}
                fullWidth
                className="mb-4"
                onPress={() => {}}
              />
            </View>
          </AppCard>
        </ScrollView>
        <View className=" bg-background pt-1">
          <AppPressable
            className="mt-2"
            onPress={() => navigation.navigate('CreateAccount' as never)}
          >
            <AppCard className="flex-row items-center rounded-2xl border border-border bg-surface px-6 py-4">
              <View className="flex-1 flex-row items-center justify-center">
                <AppText variant="lg" className="text-text-secondary">
                  New here?
                </AppText>

                <AppText variant="lg" className="ml-2 text-primary underline">
                  Create an account
                </AppText>
              </View>

              <AppIcon icon={ArrowRight} size={24} className="text-primary" />
            </AppCard>
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
