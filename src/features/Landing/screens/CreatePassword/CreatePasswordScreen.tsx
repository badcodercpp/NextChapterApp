import {
  AppIcon,
  AppInput,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  Check,
  CircleCheck,
  Eye,
  EyeOff,
  KeyRound,
  Lightbulb,
  Lock,
  Mail,
  X,
} from 'lucide-react-native';
import { Controller, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import { PASSWORD_RULES } from './rules';
import { cn } from '@/utils';
import { useCreatePassword } from './useCreatePassword';
import { useScreenHeader } from '@/navigation/hooks';

const PASSWORD_TIPS = [
  'Use a mix of letters, numbers & symbols',
  'Avoid using personal info like your name or birthday',
  "Don't reuse passwords from other accounts",
];

export function CreatePasswordScreen() {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    calculatePasswordStrength,
    control,
    errors,
    submitCreatePassword,
    clearErrors,
  } = useCreatePassword();

  useScreenHeader({ headerShown: false });

  const email = useWatch({ control, name: 'createAccount.email' });
  const atIndex = email?.lastIndexOf('@') ?? -1;
  const maskedEmail =
    atIndex > 0
      ? `${email.slice(0, 1)}***${
          atIndex > 1 ? email.slice(atIndex - 1, atIndex) : ''
        }${email.slice(atIndex)}`
      : undefined;
  const passwordInfo = calculatePasswordStrength();

  return (
    <AppScreen
      scroll
      keyboard
      safeArea={false}
      className="bg-login-background"
      contentClassName="grow items-center bg-login-background px-4 pb-8 pt-8"
    >
      <View className="w-full max-w-md">
        <View className="items-center pb-6 pt-1">
          <View className="h-24 w-24 items-center justify-center rounded-3xl bg-login-primary">
            <AppIcon icon={KeyRound} size={40} className="text-white" />
          </View>
          <AppText
            variant="4xl"
            className="mt-6 text-center font-bold text-login-text"
          >
            Set Password
          </AppText>
          <AppText variant="md" className="mt-3 text-center text-login-muted">
            Create a strong new password for your account
          </AppText>
          {maskedEmail && (
            <View className="mt-4 flex-row items-center rounded-full border border-login-primary bg-login-surface px-4 py-2">
              <AppIcon icon={Mail} size={16} className="text-login-link" />
              <AppText
                variant="sm"
                className="ml-2 shrink font-semibold text-login-link"
              >
                {maskedEmail}
              </AppText>
            </View>
          )}
        </View>

        <View className="rounded-3xl border border-login-border bg-login-surface p-5">
          <AppText variant="sm" className="mb-2 font-semibold text-login-muted">
            New Password
          </AppText>
          <Controller
            control={control}
            name="createPassword.password"
            render={({ field: { value, onBlur, onChange } }) => (
              <AppInput
                accessibilityLabel="New Password"
                placeholder="Enter new password"
                startIcon={Lock}
                startIconClassName="text-login-muted"
                secureTextEntry={!showPassword}
                endIcon={showPassword ? Eye : EyeOff}
                endIconClassName="text-login-muted"
                onEndIconPress={() => setShowPassword(!showPassword)}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                containerClassName="min-h-14 rounded-2xl bg-login-input"
                inputClassName="text-login-text"
                onFocus={() => clearErrors('createPassword.password')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.createPassword?.password?.message}
              />
            )}
          />

          <View
            accessible
            accessibilityLabel={`Password strength: ${passwordInfo.strength}, ${passwordInfo.score} of 5 rules met`}
            accessibilityLiveRegion="polite"
            className="mt-4 flex-row items-center"
          >
            <View className="mr-3 flex-1 flex-row gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <View
                  key={index}
                  className={cn(
                    'h-1 flex-1 rounded-full',
                    index < passwordInfo.score
                      ? 'bg-login-primary'
                      : 'bg-login-border',
                  )}
                />
              ))}
            </View>
            <AppText
              variant="sm"
              className="font-semibold capitalize text-login-link"
            >
              {passwordInfo.strength}
            </AppText>
          </View>

          <View className="mb-5 mt-4 flex-row flex-wrap">
            {PASSWORD_RULES.map(rule => {
              const completed = passwordInfo.rules[rule.key];
              return (
                <View
                  key={rule.key}
                  accessible
                  accessibilityLabel={`${rule.label}: ${
                    completed ? 'met' : 'not met'
                  }`}
                  className="mb-3 w-1/2 flex-row items-start pr-2"
                >
                  <View
                    className={cn(
                      'h-5 w-5 items-center justify-center rounded-full border',
                      completed
                        ? 'border-success bg-success/10'
                        : 'border-login-border bg-login-input',
                    )}
                  >
                    <AppIcon
                      icon={completed ? Check : X}
                      size={12}
                      className={
                        completed ? 'text-success' : 'text-login-muted'
                      }
                    />
                  </View>
                  <AppText
                    variant="xs"
                    className="ml-2 flex-1 text-login-muted"
                  >
                    {rule.label}
                  </AppText>
                </View>
              );
            })}
          </View>

          <AppText variant="sm" className="mb-2 font-semibold text-login-muted">
            Confirm New Password
          </AppText>
          <Controller
            control={control}
            name="createPassword.confirmPassword"
            render={({ field: { value, onBlur, onChange } }) => (
              <AppInput
                accessibilityLabel="Confirm New Password"
                placeholder="Re-enter new password"
                startIcon={Lock}
                startIconClassName="text-login-muted"
                secureTextEntry={!showConfirmPassword}
                endIcon={showConfirmPassword ? Eye : EyeOff}
                endIconClassName="text-login-muted"
                onEndIconPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                containerClassName="min-h-14 rounded-2xl bg-login-input"
                inputClassName="text-login-text"
                onFocus={() => clearErrors('createPassword.confirmPassword')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.createPassword?.confirmPassword?.message}
              />
            )}
          />

          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Continue"
            className="mt-5 min-h-14 flex-row items-center justify-center rounded-2xl bg-login-primary px-4 py-4"
            onPress={submitCreatePassword}
          >
            <AppIcon icon={CircleCheck} size={22} className="text-white" />
            <AppText variant="lg" className="ml-3 font-semibold text-white">
              Continue
            </AppText>
          </AppPressable>
        </View>

        <View className="mt-4 rounded-3xl border border-info/40 bg-login-surface p-4">
          <View className="mb-3 flex-row items-center">
            <AppIcon icon={Lightbulb} size={18} className="text-info" />
            <AppText
              variant="sm"
              className="ml-2 flex-1 font-semibold text-info"
            >
              Tips for a strong password
            </AppText>
          </View>
          {PASSWORD_TIPS.map(tip => (
            <View key={tip} className="mb-2 flex-row items-start">
              <View className="mr-2 mt-2 h-1 w-1 rounded-full bg-info" />
              <AppText variant="xs" className="flex-1 text-login-muted">
                {tip}
              </AppText>
            </View>
          ))}
        </View>
        <AppText variant="xs" className="mt-5 text-center text-login-muted">
          Your privacy is our privacy.
        </AppText>
      </View>
    </AppScreen>
  );
}
