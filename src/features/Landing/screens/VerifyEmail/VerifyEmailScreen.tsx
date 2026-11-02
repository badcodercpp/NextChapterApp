import {
  AppIcon,
  AppOtpTimer,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ChevronLeft,
  Clock3,
  Delete,
  Mail,
  ShieldCheck,
  Smartphone,
} from 'lucide-react-native';
import { TextInput, View } from 'react-native';
import { useRef, useState } from 'react';

import { Controller } from 'react-hook-form';
import { cn } from '@/utils';
import { useScreenHeader } from '@/navigation/hooks';
import { useVerifyEmail } from './useVerifyEmail';

const KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

export function VerifyEmailScreen() {
  const {
    control,
    otp,
    maskedEmail,
    submitVerifyEmail,
    navigation,
    clearErrors,
  } = useVerifyEmail();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useScreenHeader({ headerShown: false });

  return (
    <AppScreen
      scroll
      safeArea={false}
      className="bg-login-background"
      contentClassName="grow items-center bg-login-background px-5 pb-8 pt-2"
    >
      <View className="w-full max-w-md">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center rounded-full border border-login-border bg-login-surface"
          onPress={() => navigation.goBack()}
        >
          <AppIcon icon={ChevronLeft} size={22} className="text-login-text" />
        </AppPressable>

        <View className="items-center pb-6 pt-6">
          <View className="h-20 w-20 items-center justify-center rounded-3xl bg-login-primary">
            <AppIcon icon={Smartphone} size={34} className="text-white" />
            <View className="absolute -right-1 -top-1 h-6 w-6 items-center justify-center rounded-full border-2 border-login-background bg-success">
              <AppText variant="xs" className="font-bold text-white">
                {otp.length}
              </AppText>
            </View>
          </View>
          <AppText
            variant="4xl"
            className="mt-6 text-center font-bold text-login-text"
          >
            Enter OTP
          </AppText>
          <AppText variant="sm" className="mt-3 text-center text-login-muted">
            We sent a {otp.length}-digit code to your email address
          </AppText>
          <View className="mt-4 max-w-full flex-row items-center rounded-full border border-login-primary bg-login-surface px-3">
            <AppIcon icon={Mail} size={16} className="text-login-link" />
            <AppText
              variant="sm"
              className="ml-2 shrink font-semibold text-login-link"
            >
              {maskedEmail}
            </AppText>
            <AppPressable
              accessibilityRole="button"
              accessibilityLabel="Change email"
              className="min-h-11 justify-center pl-2"
              onPress={() => navigation.navigate('CreateAccount')}
            >
              <AppText variant="sm" className="font-semibold text-login-muted">
                Change
              </AppText>
            </AppPressable>
          </View>
        </View>

        <Controller
          control={control}
          name="verifyEmail.otp"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            const focusDigit = (index: number) => {
              setActiveIndex(index);
              inputRefs.current[index]?.focus();
            };

            const enterDigits = (text: string, index: number) => {
              const digits = text
                .replace(/[^0-9]/g, '')
                .slice(0, value.length - index);
              if (text && !digits) {
                return;
              }
              const next = [...value];
              if (!digits) {
                next[index] = '';
              } else {
                digits.split('').forEach((digit, offset) => {
                  next[index + offset] = digit;
                });
              }
              clearErrors('verifyEmail.otp');
              onChange(next);
              focusDigit(Math.min(index + digits.length, value.length - 1));
            };

            const deleteDigit = (index: number) => {
              const target = value[index] || index === 0 ? index : index - 1;
              const next = [...value];
              next[target] = '';
              clearErrors('verifyEmail.otp');
              onChange(next);
              focusDigit(target);
            };

            return (
              <>
                <View className="flex-row justify-center gap-3">
                  {value.map((digit, index) => (
                    <View
                      key={index}
                      className={cn(
                        'h-16 max-w-16 flex-1 items-center justify-center rounded-2xl border bg-login-input',
                        digit ? 'border-login-primary' : 'border-login-border',
                        index === activeIndex &&
                          'border-2 border-login-primary',
                        error && 'border-error',
                      )}
                    >
                      <TextInput
                        ref={ref => {
                          inputRefs.current[index] = ref;
                        }}
                        accessibilityLabel={`OTP digit ${index + 1}`}
                        value={digit}
                        keyboardType="number-pad"
                        showSoftInputOnFocus={false}
                        autoComplete="one-time-code"
                        textContentType="oneTimeCode"
                        maxLength={value.length}
                        selection={{ start: 0, end: digit.length }}
                        selectionColorClassName="accent-login-link"
                        className="h-full w-full text-center text-2xl text-login-text"
                        onFocus={() => setActiveIndex(index)}
                        onBlur={onBlur}
                        onChangeText={text => enterDigits(text, index)}
                        onKeyPress={({ nativeEvent }) => {
                          if (nativeEvent.key === 'Backspace' && !digit) {
                            deleteDigit(index);
                          }
                        }}
                      />
                    </View>
                  ))}
                </View>
                {error && (
                  <AppText
                    accessibilityRole="alert"
                    variant="sm"
                    className="mt-2 text-center text-error"
                  >
                    {error.message ||
                      'Please enter the complete verification code.'}
                  </AppText>
                )}

                <View className="my-5 flex-row items-center justify-center">
                  <View className="mr-2">
                    <AppIcon
                      icon={Clock3}
                      size={18}
                      className="text-login-muted"
                    />
                  </View>
                  <AppOtpTimer
                    minute={2}
                    second={0}
                    textClassName="font-semibold text-login-link"
                  />
                </View>
                <AppPressable
                  accessibilityRole="button"
                  accessibilityLabel="Verify OTP"
                  className="min-h-14 flex-row items-center justify-center rounded-2xl bg-login-primary px-4 py-4"
                  onPress={submitVerifyEmail}
                >
                  <AppIcon
                    icon={ShieldCheck}
                    size={22}
                    className="text-white"
                  />
                  <AppText
                    variant="lg"
                    className="ml-3 font-semibold text-white"
                  >
                    Verify OTP
                  </AppText>
                </AppPressable>
                <AppText
                  variant="xs"
                  className="mt-4 text-center text-login-muted"
                >
                  Didn't receive the code? Check your spam folder or resend the
                  code.
                </AppText>
                <View className="my-5 flex-row items-center">
                  <View className="h-px flex-1 bg-login-border" />
                  <AppText variant="xs" className="mx-3 text-login-muted">
                    Or enter manually
                  </AppText>
                  <View className="h-px flex-1 bg-login-border" />
                </View>

                <View className="flex-row flex-wrap justify-between gap-y-3">
                  {KEYPAD.map((key, index) =>
                    key ? (
                      <AppPressable
                        key={key}
                        accessibilityRole="button"
                        accessibilityLabel={
                          key === 'delete' ? 'Delete digit' : `Enter ${key}`
                        }
                        className={cn(
                          'h-14 w-[31%] items-center justify-center rounded-2xl border border-login-border bg-login-surface',
                          key === 'delete' && 'border-login-primary',
                        )}
                        onPress={() =>
                          key === 'delete'
                            ? deleteDigit(activeIndex)
                            : enterDigits(key, activeIndex)
                        }
                      >
                        {key === 'delete' ? (
                          <AppIcon
                            icon={Delete}
                            size={22}
                            className="text-login-link"
                          />
                        ) : (
                          <AppText
                            variant="xl"
                            className="font-semibold text-login-text"
                          >
                            {key}
                          </AppText>
                        )}
                      </AppPressable>
                    ) : (
                      <View key={`empty-${index}`} className="h-14 w-[31%]" />
                    ),
                  )}
                </View>
              </>
            );
          }}
        />
      </View>
    </AppScreen>
  );
}
