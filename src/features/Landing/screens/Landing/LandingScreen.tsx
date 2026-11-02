import { AppScreen } from '@/components';
import { LandingBackground } from '@/features/Landing/components/LandingBackground';
import { LandingBanner } from '@/features/Landing/components/LandingBanner';
import { LandingCTA } from '@/features/Landing/components/LandingCTA';
import { View } from 'react-native';
import { useScreenHeader } from '@/navigation/hooks';

export function LandingScreen() {
  useScreenHeader({ headerShown: false });

  return (
    <AppScreen
      scroll
      safeArea={false}
      safeBottom={false}
      className="bg-landing-background"
      contentClassName="grow bg-landing-background"
    >
      <View className="flex-1 justify-between overflow-hidden">
        <LandingBackground />
        <LandingBanner />
        <LandingCTA />
      </View>
    </AppScreen>
  );
}
