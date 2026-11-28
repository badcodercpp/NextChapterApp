import { AppHeroArtwork, AppMountainArtwork, AppText } from '@/components';
import { Image, View } from 'react-native';

export function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View className="mb-5 items-center overflow-hidden rounded-3xl border border-primary-v2/25 bg-primary-v2/10 px-4 py-5">
      <AppHeroArtwork />
      <AppMountainArtwork variant="hills" className="h-1/2 w-3/5" />
      <Image
        source={require('@/assets/images/logo.png')}
        resizeMode="contain"
        className="h-24 w-24 rounded-full"
        accessibilityLabel="KhudSe logo"
      />
      <AppText
        variant="4xl"
        className="mt-3 text-center font-bold text-text-v2"
      >
        {title}
      </AppText>
      <AppText variant="md" className="mt-2 text-center text-text-muted-v2">
        {subtitle}
      </AppText>
    </View>
  );
}
