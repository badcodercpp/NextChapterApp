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
import { ScrollView, View } from 'react-native';

import { Controller } from 'react-hook-form';
import { LayoutTopImageComponent } from '@/features/Landing/components/LayoutTopImageComponent';
import { useLogin } from './useLogin';

export function LoginScreen() {
  const {
    navigation,
    loading,
    showPassword,
    setShowPassword,
    control,
    errors,
    pending,
    submitLogin,
  } = useLogin();

  return (
    <AppScreen
      safeBottom={true}
      safeTop={false}
      className="flex-1 bg-background"
      contentClassName="flex-1 bg-background"
      safeArea={false}
    >
      <LayoutTopImageComponent
        source={require('@/assets/images/landing-background.png')}
      />
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

            <Controller
              control={control}
              name="login.email"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  placeholder="Enter your email"
                  startIcon={Mail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="mb-6"
                  error={errors?.login?.email?.message}
                />
              )}
            />

            <AppText variant="sm" className="mb-1 px-2 text-text">
              Password
            </AppText>

            <Controller
              control={control}
              name="login.password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  placeholder="Enter your password"
                  startIcon={Lock}
                  secureTextEntry={!showPassword}
                  endIcon={showPassword ? EyeOff : Eye}
                  onEndIconPress={() => setShowPassword(!showPassword)}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors?.login?.password?.message}
                />
              )}
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
              loading={loading || pending}
              onPress={submitLogin}
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
            onPress={() => navigation.navigate('CreateAccount')}
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
