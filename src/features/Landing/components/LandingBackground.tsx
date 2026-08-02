import { ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export function LandingBackground() {
  return (
    <ImageBackground
      source={require('@/assets/images/landing-background.png')}
      resizeMode="cover"
      className="absolute bottom-0 left-0 right-0 h-[400px] w-full"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ width: '100%' }}
    >
      <LinearGradient
        colors={['#141129', 'rgba(20,17,41,0.75)', 'transparent']}
        locations={[0, 0.2, 0.45, 1]}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          inset: 0,
        }}
      />
    </ImageBackground>
  );
}
