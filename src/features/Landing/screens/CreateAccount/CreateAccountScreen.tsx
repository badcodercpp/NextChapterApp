import {
  AppIcon,
  AppInput,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import { Info, Mail, User, UserPlus } from 'lucide-react-native';
import { Image, View } from 'react-native';
import { usePreventBackNavigation, useScreenHeader } from '@/navigation/hooks';

import { Controller } from 'react-hook-form';
import { GoogleAuthButton } from '@/features/Landing/components/GoogleAuthButton';
import useGoogleSignIn from '@/hooks/useGoogleSignIn';
import { useCreateAccount } from './useCreateAccount';

export function CreateAccountScreen() {
  const { control, errors, submitCreateAccount, navigation, clearErrors } =
    useCreateAccount();
  const { doGoogleOnboard, isGoogleRegisterLoading } = useGoogleSignIn();

  useScreenHeader({
    headerShown: false,
    backDisabled: isGoogleRegisterLoading,
  });
  usePreventBackNavigation(isGoogleRegisterLoading);

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
            Create Account
          </AppText>
          <AppText variant="md" className="mt-2 text-center text-login-muted">
            Begin your healing journey today
          </AppText>
        </View>

        <View className="rounded-3xl border border-login-border bg-login-surface p-5">
          <View className="mb-6 flex-row rounded-2xl border border-login-border bg-login-input p-1">
            <AppPressable
              accessibilityRole="tab"
              accessibilityLabel="Sign In"
              accessibilityState={{ selected: false }}
              disabled={isGoogleRegisterLoading}
              className="min-h-11 flex-1 items-center justify-center px-2 py-3"
              onPress={() => navigation.navigate('Login')}
            >
              <AppText
                variant="sm"
                className="text-center font-semibold text-login-muted"
              >
                Sign In
              </AppText>
            </AppPressable>
            <View
              accessibilityRole="tab"
              accessibilityLabel="Create Account"
              accessibilityState={{ selected: true }}
              className="min-h-11 flex-1 items-center justify-center rounded-xl bg-login-primary px-2 py-3"
            >
              <AppText
                variant="sm"
                className="text-center font-semibold text-white"
              >
                Create Account
              </AppText>
            </View>
          </View>

          <AppText variant="sm" className="mb-2 font-semibold text-login-muted">
            Full Name
          </AppText>
          <Controller
            control={control}
            name="createAccount.fullName"
            render={({ field: { value, onBlur, onChange } }) => (
              <AppInput
                accessibilityLabel="Full Name"
                placeholder="Enter your full name"
                startIcon={User}
                startIconClassName="text-login-muted"
                autoComplete="name"
                autoCapitalize="words"
                disabled={isGoogleRegisterLoading}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="mb-4"
                containerClassName="min-h-14 rounded-2xl bg-login-input"
                inputClassName="text-login-text"
                error={errors?.createAccount?.fullName?.message}
                onFocus={() => clearErrors('createAccount.fullName')}
              />
            )}
          />

          <AppText variant="sm" className="mb-2 font-semibold text-login-muted">
            Email Address
          </AppText>
          <Controller
            control={control}
            name="createAccount.email"
            render={({ field: { value, onBlur, onChange } }) => (
              <AppInput
                accessibilityLabel="Email Address"
                placeholder="Enter your email address"
                startIcon={Mail}
                startIconClassName="text-login-muted"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect={false}
                disabled={isGoogleRegisterLoading}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                containerClassName="min-h-14 rounded-2xl bg-login-input"
                inputClassName="text-login-text"
                error={errors?.createAccount?.email?.message}
                onFocus={() => clearErrors('createAccount.email')}
              />
            )}
          />

          <View className="mb-5 mt-3 flex-row items-center">
            <AppIcon icon={Info} size={16} className="text-login-link" />
            <AppText variant="xs" className="ml-2 flex-1 text-login-muted">
              We will send a verification code to this email.
            </AppText>
          </View>

          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Continue to password"
            disabled={isGoogleRegisterLoading}
            className="min-h-14 flex-row items-center justify-center rounded-2xl bg-login-primary px-4 py-4"
            onPress={submitCreateAccount}
          >
            <AppIcon icon={UserPlus} size={22} className="text-white" />
            <AppText variant="lg" className="ml-3 font-semibold text-white">
              Continue
            </AppText>
          </AppPressable>

          <View className="my-5 flex-row items-center">
            <View className="h-px flex-1 bg-login-border" />
            <AppText variant="sm" className="mx-3 text-login-muted">
              or sign up with
            </AppText>
            <View className="h-px flex-1 bg-login-border" />
          </View>
          <GoogleAuthButton
            loading={isGoogleRegisterLoading}
            disabled={isGoogleRegisterLoading}
            onPress={doGoogleOnboard}
          />
        </View>

        <View className="mt-5 flex-row flex-wrap items-center justify-center">
          <AppText variant="sm" className="text-login-muted">
            Already have an account?
          </AppText>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Log in"
            disabled={isGoogleRegisterLoading}
            className="min-h-11 justify-center px-1 py-2"
            onPress={() => navigation.navigate('Login')}
          >
            <AppText variant="sm" className="font-semibold text-login-link">
              Log in
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
