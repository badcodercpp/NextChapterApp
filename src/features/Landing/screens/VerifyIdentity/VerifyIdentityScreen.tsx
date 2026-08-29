import {
  AppButton,
  AppCard,
  AppIcon,
  AppPressable,
  AppScreen,
  AppText,
} from '@/components';
import {
  ArrowRight,
  Clock3,
  Lock,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react-native';
import { ImageBackground, ScrollView, TextInput, View } from 'react-native';

import { Controller } from 'react-hook-form';
import { LandingNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { cn } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { useVerifyIdentity } from './useVerifyIdentity';

export function VerifyIdentityScreen() {
  const navigation = useNavigation<LandingNavigationProp>();

  const { control, otp, maskedEmail } = useVerifyIdentity();

  const inputRefs = useRef<Array<TextInput | null>>([]);

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
      <View className="mt-4 items-center mb-4">
        <AppText variant="4xl" className="text-center text-text">
          Verify your
          <AppText variant="4xl" className="text-primary">
            {' '}
            identity
          </AppText>
        </AppText>

        <AppText variant="sm" className="mt-2 text-center text-text-secondary">
          We've sent a 4-digit verification code to
        </AppText>

        <AppText variant="sm" className="text-center text-text-secondary">
          {maskedEmail}
        </AppText>
      </View>
      <View className="flex-1 px-4">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="mt-4">
            {/* OTP */}

            <Controller
              control={control}
              name="verifyIdentity.otp"
              render={({ field: { value, onChange } }) => (
                <View className="flex-row justify-between">
                  {otp.map((digit, index) => (
                    <View
                      key={index}
                      className={cn(
                        'h-16 w-16 items-center justify-center rounded-2xl border bg-surface',
                        digit ? 'border-primary' : 'border-border',
                      )}
                    >
                      <TextInput
                        ref={ref => {
                          inputRefs.current[index] = ref;
                        }}
                        value={value[index]}
                        keyboardType="number-pad"
                        maxLength={1}
                        cursorColor="#A855F7"
                        selectionColor="#A855F7"
                        className="w-full text-center text-3xl text-text"
                        onChangeText={text => {
                          const val = text.replace(/[^0-9]/g, '');

                          const next = [...value];

                          next[index] = val;

                          onChange(next);

                          if (value && index < 5) {
                            inputRefs.current[index + 1]?.focus();
                          }
                        }}
                        onKeyPress={({ nativeEvent }) => {
                          if (
                            nativeEvent.key === 'Backspace' &&
                            !otp[index] &&
                            index > 0
                          ) {
                            inputRefs.current[index - 1]?.focus();
                          }
                        }}
                      />
                    </View>
                  ))}
                </View>
              )}
            />

            <View className="mt-6 items-center">
              <AppText variant="md" className="mt-3 mb-3 text-text-secondary">
                Code will expire in
              </AppText>
              <View className="flex-row items-center">
                <AppIcon
                  icon={Clock3}
                  size={22}
                  className="mr-3 text-primary"
                />

                <AppText variant="md" className="text-primary">
                  10:00
                </AppText>
              </View>
            </View>
          </View>

          <AppCard className="mt-6 flex-row rounded-2xl border border-border bg-surface p-5">
            <AppIcon
              icon={ShieldCheck}
              size={28}
              className="mr-4 mt-1 text-primary"
            />

            <AppText variant="md" className="flex-1 text-text-secondary">
              Didn't receive the code? Check your spam folder or resend the
              code.
            </AppText>
          </AppCard>

          <View className="mt-4 flex-row rounded-2xl border border-border bg-surface">
            <AppPressable
              className="flex-1 flex-row items-center justify-center py-3"
              onPress={() => {
                // resend otp
              }}
            >
              <AppIcon
                icon={RefreshCcw}
                size={22}
                className="mr-3 text-primary"
              />

              <AppText variant="md" className="text-primary">
                Resend Code
              </AppText>
            </AppPressable>
          </View>
        </ScrollView>
        <View className="bg-background pt-2">
          <View className="mt-2 items-center justify-center">
            <AppButton
              title="Verify OTP"
              size="lg"
              fullWidth
              rightIcon={ArrowRight}
              className="mt-0"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
          <View className="mt-2 flex-row items-center justify-center">
            <AppText variant="xl" className="text-text-secondary">
              Remember your password?
            </AppText>

            <AppPressable
              className="ml-2"
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <AppText
                variant="xl"
                className="font-semibold text-primary underline"
              >
                Log in
              </AppText>
            </AppPressable>
          </View>
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
