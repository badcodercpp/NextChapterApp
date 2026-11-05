import {
  AppIcon,
  AppInput,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { Image, View } from 'react-native';
import { usePreventBackNavigation, useScreenHeader } from '@/navigation/hooks';

import { Controller } from 'react-hook-form';
import { GoogleAuthButton } from '@/features/Landing/components/GoogleAuthButton';
import useGoogleSignIn from '@/hooks/useGoogleSignIn';
import { useLogin } from './useLogin';

export function LoginScreen() {
  const {
    navigation,
    showPassword,
    setShowPassword,
    control,
    errors,
    submitLogin,
    clearErrors,
    isLoading,
  } = useLogin();

  const { doGoogleSignIn, isGoogleLoginLoading } = useGoogleSignIn();
  const isAuthenticating = isLoading || isGoogleLoginLoading;

  useScreenHeader({
    headerShown: true,
    backDisabled: isAuthenticating,
  });

  usePreventBackNavigation(isAuthenticating);

  return (
    <AppScreen
      scroll
      keyboard
      safeArea={false}
      className="bg-background-v2"
      contentClassName="grow items-center bg-background-v2 px-4 pb-8 pt-2"
    >
      <View className="w-full max-w-md">
        <View className="items-center pb-8 pt-1">
          <Image
            source={require('@/assets/images/logo.png')}
            resizeMode="contain"
            className="h-24 w-24 rounded-full"
            accessibilityLabel="NextChapter logo"
          />
          <AppText
            variant="4xl"
            className="mt-3 text-center font-bold text-text-v2"
          >
            NextChapter
          </AppText>
          <AppText variant="md" className="mt-2 text-center text-text-muted-v2">
            Your healing journey starts here
          </AppText>
        </View>

        <View className="rounded-3xl border border-border-v2 bg-surface-v2 p-5">
          <View className="mb-6 flex-row rounded-2xl border border-border-v2 bg-input-v2 p-1">
            <View
              accessibilityRole="tab"
              accessibilityState={{ selected: true }}
              className="min-h-11 flex-1 items-center justify-center rounded-xl bg-primary-v2 px-2 py-3"
            >
              <AppText
                variant="sm"
                className="font-semibold text-on-primary-v2"
              >
                Sign In
              </AppText>
            </View>
            <AppPressable
              accessibilityRole="tab"
              accessibilityLabel="Create Account"
              accessibilityState={{ selected: false }}
              disabled={isAuthenticating}
              className="min-h-11 flex-1 items-center justify-center px-2 py-3"
              onPress={() => navigation.replace('CreateAccount')}
            >
              <AppText
                variant="sm"
                className="text-center font-semibold text-text-muted-v2"
              >
                Create Account
              </AppText>
            </AppPressable>
          </View>

          <AppText
            variant="sm"
            className="mb-2 font-semibold text-text-muted-v2"
          >
            Email
          </AppText>
          <Controller
            control={control}
            name="login.email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                variant="v2"
                accessibilityLabel="Email"
                placeholder="Enter your email address"
                startIcon={Mail}
                startIconClassName="text-text-muted-v2"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                disabled={isAuthenticating}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mb-4"
                containerClassName="min-h-14 rounded-2xl bg-input-v2"
                inputClassName="text-text-v2"
                error={errors?.login?.email?.message}
                onFocus={() => clearErrors('login.email')}
              />
            )}
          />

          <AppText
            variant="sm"
            className="mb-2 font-semibold text-text-muted-v2"
          >
            Password
          </AppText>
          <Controller
            control={control}
            name="login.password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                variant="v2"
                accessibilityLabel="Password"
                placeholder="Enter your password"
                startIcon={Lock}
                startIconClassName="text-text-muted-v2"
                secureTextEntry={!showPassword}
                endIcon={showPassword ? Eye : EyeOff}
                endIconClassName="text-text-muted-v2"
                onEndIconPress={() => setShowPassword(!showPassword)}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                disabled={isAuthenticating}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                containerClassName="min-h-14 rounded-2xl bg-input-v2"
                inputClassName="text-text-v2"
                error={errors?.login?.password?.message}
                onFocus={() => clearErrors('login.password')}
              />
            )}
          />

          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Forgot Password"
            disabled={isAuthenticating}
            className="min-h-11 self-end justify-center py-2"
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <AppText variant="sm" className="font-semibold text-link-v2">
              Forgot Password?
            </AppText>
          </AppPressable>

          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Sign In"
            accessibilityState={{
              busy: isLoading,
              disabled: isAuthenticating,
            }}
            className="mt-0 min-h-14 flex-row items-center justify-center rounded-2xl bg-primary-v2 px-4 py-4"
            disabled={isAuthenticating}
            onPress={submitLogin}
          >
            <AppIcon
              icon={ArrowRight}
              size={22}
              className="text-on-primary-v2"
            />
            <AppText
              variant="lg"
              className="ml-3 font-semibold text-on-primary-v2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </AppText>
          </AppPressable>

          <View className="my-5 flex-row items-center">
            <View className="h-px flex-1 bg-border-v2" />
            <AppText variant="sm" className="mx-3 text-text-muted-v2">
              or continue with
            </AppText>
            <View className="h-px flex-1 bg-border-v2" />
          </View>

          <GoogleAuthButton
            loading={isGoogleLoginLoading}
            disabled={isAuthenticating}
            onPress={doGoogleSignIn}
          />
        </View>

        <View className="mt-5 flex-row flex-wrap items-center justify-center">
          <AppText variant="sm" className="text-text-muted-v2">
            Don't have an account?
          </AppText>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Create an account"
            disabled={isAuthenticating}
            className="min-h-11 justify-center px-1 py-2"
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <AppText variant="sm" className="font-semibold text-link-v2">
              Create one
            </AppText>
          </AppPressable>
        </View>
        <AppText variant="xs" className="mt-5 text-center text-text-muted-v2">
          Your privacy is our privacy.
        </AppText>
      </View>
    </AppScreen>
  );
}
