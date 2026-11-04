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

import { PASSWORD_RULES } from './rules';
import { View } from 'react-native';
import { cn } from '@/utils';
import { useCreatePassword } from './useCreatePassword';

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
      className="bg-background-v2"
      contentClassName="grow items-center bg-background-v2 px-4 pb-8 pt-8"
    >
      <View className="w-full max-w-md">
        <View className="items-center pb-6 pt-1">
          <View className="h-24 w-24 items-center justify-center rounded-3xl bg-primary-v2">
            <AppIcon icon={KeyRound} size={40} className="text-on-primary-v2" />
          </View>
          <AppText
            variant="4xl"
            className="mt-6 text-center font-bold text-text-v2"
          >
            Set Password
          </AppText>
          <AppText variant="md" className="mt-3 text-center text-text-muted-v2">
            Create a strong new password for your account
          </AppText>
          {maskedEmail && (
            <View className="mt-4 flex-row items-center rounded-full border border-primary-v2 bg-surface-v2 px-4 py-2">
              <AppIcon icon={Mail} size={16} className="text-link-v2" />
              <AppText
                variant="sm"
                className="ml-2 shrink font-semibold text-link-v2"
              >
                {maskedEmail}
              </AppText>
            </View>
          )}
        </View>

        <View className="rounded-3xl border border-border-v2 bg-surface-v2 p-5">
          <AppText
            variant="sm"
            className="mb-2 font-semibold text-text-muted-v2"
          >
            New Password
          </AppText>
          <Controller
            control={control}
            name="createPassword.password"
            render={({ field: { value, onBlur, onChange } }) => (
              <AppInput
                variant="v2"
                accessibilityLabel="New Password"
                placeholder="Enter new password"
                startIcon={Lock}
                startIconClassName="text-text-muted-v2"
                secureTextEntry={!showPassword}
                endIcon={showPassword ? Eye : EyeOff}
                endIconClassName="text-text-muted-v2"
                onEndIconPress={() => setShowPassword(!showPassword)}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                containerClassName="min-h-14 rounded-2xl bg-input-v2"
                inputClassName="text-text-v2"
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
                      ? 'bg-primary-v2'
                      : 'bg-border-v2',
                  )}
                />
              ))}
            </View>
            <AppText
              variant="sm"
              className="font-semibold capitalize text-link-v2"
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
                        : 'border-border-v2 bg-input-v2',
                    )}
                  >
                    <AppIcon
                      icon={completed ? Check : X}
                      size={12}
                      className={
                        completed ? 'text-success' : 'text-text-muted-v2'
                      }
                    />
                  </View>
                  <AppText
                    variant="xs"
                    className="ml-2 flex-1 text-text-muted-v2"
                  >
                    {rule.label}
                  </AppText>
                </View>
              );
            })}
          </View>

          <AppText
            variant="sm"
            className="mb-2 font-semibold text-text-muted-v2"
          >
            Confirm New Password
          </AppText>
          <Controller
            control={control}
            name="createPassword.confirmPassword"
            render={({ field: { value, onBlur, onChange } }) => (
              <AppInput
                variant="v2"
                accessibilityLabel="Confirm New Password"
                placeholder="Re-enter new password"
                startIcon={Lock}
                startIconClassName="text-text-muted-v2"
                secureTextEntry={!showConfirmPassword}
                endIcon={showConfirmPassword ? Eye : EyeOff}
                endIconClassName="text-text-muted-v2"
                onEndIconPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                containerClassName="min-h-14 rounded-2xl bg-input-v2"
                inputClassName="text-text-v2"
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
            className="mt-5 min-h-14 flex-row items-center justify-center rounded-2xl bg-primary-v2 px-4 py-4"
            onPress={submitCreatePassword}
          >
            <AppIcon
              icon={CircleCheck}
              size={22}
              className="text-on-primary-v2"
            />
            <AppText
              variant="lg"
              className="ml-3 font-semibold text-on-primary-v2"
            >
              Continue
            </AppText>
          </AppPressable>
        </View>

        <View className="mt-4 rounded-3xl border border-info/40 bg-surface-v2 p-4">
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
              <AppText variant="xs" className="flex-1 text-text-muted-v2">
                {tip}
              </AppText>
            </View>
          ))}
        </View>
        <AppText variant="xs" className="mt-5 text-center text-text-muted-v2">
          Your privacy is our privacy.
        </AppText>
      </View>
    </AppScreen>
  );
}
