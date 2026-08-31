import { AppButton, AppIcon, AppInput, AppScreen, AppText } from '@/components';
import { ArrowRight, Lock, Mail } from 'lucide-react-native';
import { ImageBackground, ScrollView, View } from 'react-native';

import { Controller } from 'react-hook-form';
import { LandingNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { useForgotPassword } from './useForgotPassword';
import { useNavigation } from '@react-navigation/native';

export function ForgotPasswordScreen() {
  const navigation = useNavigation<LandingNavigationProp>();

  const { control, errors, clearErrors } = useForgotPassword();

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
          Forgot your
          <AppText variant="4xl" className="text-primary">
            {' '}
            password?
          </AppText>
        </AppText>

        <AppText variant="sm" className="mt-2 text-center text-text-secondary">
          No worries! Enter your email address
        </AppText>

        <AppText variant="sm" className="text-center text-text-secondary">
          and we'll send you a verification code.
        </AppText>
      </View>
      <View className="flex-1 px-4">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Controller
            control={control}
            name="forgotPassword.email"
            render={({ field: { value, onBlur, onChange } }) => (
              <View className="mt-4">
                <AppText variant="sm" className="mb-3 text-text">
                  Email address
                </AppText>

                <AppInput
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  startIcon={Mail}
                  onFocus={() => {
                    clearErrors('forgotPassword.email');
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.forgotPassword?.email?.message}
                />
              </View>
            )}
          />

          <View className="mt-3 flex-row justify-center items-start px-2">
            <AppIcon icon={Lock} size={16} className="text-primary" />
            <AppText variant="sm" className="text-center pl-2 text-text-muted ">
              We'll send a 4-digit verification code to this email address.
            </AppText>
          </View>
        </ScrollView>
        <View className=" bg-background pt-2">
          <View className="mt-2 items-center justify-center">
            <AppButton
              title="Send OTP"
              size="lg"
              fullWidth
              rightIcon={ArrowRight}
              className="mt-0"
              onPress={() => navigation.navigate('VerifyIdentity')}
            />
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
