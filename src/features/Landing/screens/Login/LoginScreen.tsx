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
    headerShown: false,
    backDisabled: isAuthenticating,
  });

  usePreventBackNavigation(isAuthenticating);

  return (
    <AppScreen
      scroll
      keyboard
      safeArea={false}
      className="bg-login-background"
      contentClassName="grow items-center bg-login-background px-4 pb-8 pt-8"
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
            className="mt-3 text-center font-bold text-login-text"
          >
            NextChapter
          </AppText>
          <AppText variant="md" className="mt-2 text-center text-login-muted">
            Your healing journey starts here
          </AppText>
        </View>

        <View className="rounded-3xl border border-login-border bg-login-surface p-5">
          <View className="mb-6 flex-row rounded-2xl border border-login-border bg-login-input p-1">
            <View
              accessibilityRole="tab"
              accessibilityState={{ selected: true }}
              className="min-h-11 flex-1 items-center justify-center rounded-xl bg-login-primary px-2 py-3"
            >
              <AppText variant="sm" className="font-semibold text-white">
                Sign In
              </AppText>
            </View>
            <AppPressable
              accessibilityRole="tab"
              accessibilityLabel="Create Account"
              accessibilityState={{ selected: false }}
              disabled={isAuthenticating}
              className="min-h-11 flex-1 items-center justify-center px-2 py-3"
              onPress={() => navigation.navigate('CreateAccount')}
            >
              <AppText
                variant="sm"
                className="text-center font-semibold text-login-muted"
              >
                Create Account
              </AppText>
            </AppPressable>
          </View>

          <AppText variant="sm" className="mb-2 font-semibold text-login-muted">
            Email
          </AppText>
          <Controller
            control={control}
            name="login.email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                accessibilityLabel="Email"
                placeholder="Enter your email address"
                startIcon={Mail}
                startIconClassName="text-login-muted"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                disabled={isAuthenticating}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mb-4"
                containerClassName="min-h-14 rounded-2xl bg-login-input"
                inputClassName="text-login-text"
                error={errors?.login?.email?.message}
                onFocus={() => clearErrors('login.email')}
              />
            )}
          />

          <AppText variant="sm" className="mb-2 font-semibold text-login-muted">
            Password
          </AppText>
          <Controller
            control={control}
            name="login.password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                accessibilityLabel="Password"
                placeholder="Enter your password"
                startIcon={Lock}
                startIconClassName="text-login-muted"
                secureTextEntry={!showPassword}
                endIcon={showPassword ? Eye : EyeOff}
                endIconClassName="text-login-muted"
                onEndIconPress={() => setShowPassword(!showPassword)}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                disabled={isAuthenticating}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                containerClassName="min-h-14 rounded-2xl bg-login-input"
                inputClassName="text-login-text"
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
            <AppText variant="sm" className="font-semibold text-login-link">
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
            className="mt-0 min-h-14 flex-row items-center justify-center rounded-2xl bg-login-primary px-4 py-4"
            disabled={isAuthenticating}
            onPress={submitLogin}
          >
            <AppIcon icon={ArrowRight} size={22} className="text-white" />
            <AppText variant="lg" className="ml-3 font-semibold text-white">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </AppText>
          </AppPressable>

          <View className="my-5 flex-row items-center">
            <View className="h-px flex-1 bg-login-border" />
            <AppText variant="sm" className="mx-3 text-login-muted">
              or continue with
            </AppText>
            <View className="h-px flex-1 bg-login-border" />
          </View>

          <GoogleAuthButton
            loading={isGoogleLoginLoading}
            disabled={isAuthenticating}
            onPress={doGoogleSignIn}
          />
        </View>

        <View className="mt-5 flex-row flex-wrap items-center justify-center">
          <AppText variant="sm" className="text-login-muted">
            Don't have an account?
          </AppText>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Create an account"
            disabled={isAuthenticating}
            className="min-h-11 justify-center px-1 py-2"
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <AppText variant="sm" className="font-semibold text-login-link">
              Create one
            </AppText>
          </AppPressable>
        </View>
        <AppText variant="xs" className="mt-5 text-center text-login-muted">
          Your privacy is our privacy.
        </AppText>
      </View>
    </AppScreen>
  );
}
