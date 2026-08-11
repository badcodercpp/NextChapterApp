import {
  AppButton,
  AppCard,
  AppIcon,
  AppInput,
  AppScreen,
  AppText,
} from '@/components';
import { ArrowRight, Check, Eye, EyeOff, Lock, X } from 'lucide-react-native';
import { ImageBackground, ScrollView, View } from 'react-native';
import { PASSWORD_RULES, usePassword } from './usePassword';

import { LandingNavigationProp } from '../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { cn } from '@/utils';
import { useNavigation } from '@react-navigation/native';

export function CreatePasswordScreen() {
  const navigation = useNavigation<LandingNavigationProp>();
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    calculatePasswordStrength,
  } = usePassword();

  const passwordInfo = calculatePasswordStrength();

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
          Secure your
          <AppText variant="4xl" className="text-primary">
            {' '}
            account
          </AppText>
        </AppText>

        <AppText variant="sm" className="mt-2 text-center text-text-secondary">
          Create a strong password
        </AppText>

        <AppText variant="sm" className="text-center text-text-secondary">
          to keep your account safe.
        </AppText>
      </View>
      <View className="flex-1 px-4">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="mt-0">
            <AppText variant="sm" className="mb-2 text-text">
              Create password
            </AppText>

            <AppInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              startIcon={Lock}
              secureTextEntry={!showPassword}
              endIcon={showPassword ? EyeOff : Eye}
              onEndIconPress={() => setShowPassword(!showPassword)}
            />

            <View className="mt-5">
              <View className="flex-row items-center">
                <AppText variant="sm" className="text-text-secondary">
                  Password strength:
                </AppText>

                <AppText variant="md" className="ml-2 text-success">
                  {passwordInfo.strength}
                </AppText>
              </View>

              <View className="mt-4 flex-row gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <View
                    key={index}
                    className={cn(
                      'h-2 flex-1 rounded-full',
                      index < passwordInfo.score ? 'bg-success' : 'bg-divider',
                    )}
                  />
                ))}
              </View>
            </View>

            <AppText variant="sm" className="mb-3 mt-8 text-text">
              Confirm password
            </AppText>

            <AppInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              startIcon={Lock}
              secureTextEntry={!showConfirmPassword}
              endIcon={showConfirmPassword ? EyeOff : Eye}
              onEndIconPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />

            <AppText variant="sm" className="mb-1 mt-8 text-text">
              Password rule
            </AppText>

            <AppCard className="mt-1 rounded-2xl border border-border bg-surface p-6">
              {PASSWORD_RULES.map(rule => {
                const completed = passwordInfo.rules[rule.key];
                return (
                  <View
                    key={rule.label}
                    className="mb-5 flex-row items-center last:mb-0"
                  >
                    <View className="mr-4">
                      {completed ? (
                        <AppIcon
                          icon={Check}
                          size={18}
                          className="text-white"
                        />
                      ) : (
                        <AppIcon icon={X} size={18} className="text-white" />
                      )}
                    </View>

                    <AppText
                      variant="md"
                      numberOfLines={1}
                      className={
                        completed ? 'text-text' : 'text-text-secondary'
                      }
                    >
                      {rule.label}
                    </AppText>
                  </View>
                );
              })}
            </AppCard>
          </View>
        </ScrollView>
        <View className=" bg-background pt-2">
          <View className="mt-2 items-center justify-center">
            <AppButton
              title="Continue"
              size="lg"
              fullWidth
              rightIcon={ArrowRight}
              className="mt-0"
              onPress={() => {
                navigation.navigate('VerifyEmail');
              }}
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
