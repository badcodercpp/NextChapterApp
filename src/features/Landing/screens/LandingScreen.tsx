import { LandingBackground } from '@/features/Landing/components/LandingBackground';
import { LandingBanner } from '@/features/Landing/components/LandingBanner';
import { LandingCTA } from '@/features/Landing/components/LandingCTA';
import { View } from 'react-native';

export function LandingScreen() {
  return (
    <View className="flex-1 bg-background">
      <LandingBackground />
      <View className="flex-1 justify-between">
        <LandingBanner />
        <LandingCTA />
      </View>
    </View>
  );
}
