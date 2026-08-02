import { AppButton, AppText } from '@/components';
import { Pressable, View } from 'react-native';

import { ArrowRightIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export function LandingCTA() {
  const navigation = useNavigation();
  return (
    <View className="px-4 pb-16">
      <AppButton
        title="Begin Your Journey"
        // variant="gradient"
        size="md"
        rightIcon={ArrowRightIcon}
        fullWidth
        onPress={() => navigation.navigate('Onboarding' as never)}
      />

      <View className="mt-2 flex-row items-center justify-center">
        <AppText variant="base" className="text-text-secondary">
          Already have an account?
        </AppText>

        <Pressable onPress={() => navigation.navigate('Login' as never)}>
          <AppText variant="base" className="ml-2 font-bold text-text">
            Log In
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}
