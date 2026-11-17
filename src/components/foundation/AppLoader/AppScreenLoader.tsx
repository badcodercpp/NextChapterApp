import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react';

import { AppIcon } from '../AppIcon';
import { AppText } from '../AppText';
import { Flower2 } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title?: string;
  subtitle?: string;
};

const RING = 100;

export function AppScreenLoader({
  title = 'Please wait',
  subtitle = 'Preparing your account...',
}: Props) {
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinLoop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    spinLoop.start();
    pulseLoop.start();
    return () => {
      spinLoop.stop();
      pulseLoop.stop();
    };
  }, [spin, pulse]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.8],
  });

  return (
    <View
      className="flex-1 items-center justify-center"
      accessibilityRole="progressbar"
      accessibilityLabel={title}
    >
      <LinearGradient
        colors={['#140F2B', '#1B1038', '#140F2B']}
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-primary/20"
      />

      <View
        className="items-center justify-center"
        style={{ width: RING, height: RING }}
      >
        <Animated.View
          className="absolute h-36 w-36 rounded-full bg-primary/40"
          style={{ opacity: glowOpacity }}
        />
        <View
          className="absolute rounded-full border border-primary/30"
          style={{ width: RING, height: RING }}
        />
        <Animated.View
          className="absolute rounded-full border-2 border-transparent border-l-[#C084FC] border-t-[#C084FC]"
          style={{
            width: RING,
            height: RING,
            transform: [{ rotate }],
          }}
        />
        <View className="h-[72px] w-[72px] items-center justify-center rounded-full border border-white/15 bg-white/10">
          <AppIcon icon={Flower2} size={32} className="text-primary" />
        </View>
      </View>

      <AppText variant="2xl" className="mt-8 font-bold text-white">
        {title}
      </AppText>
      <AppText variant="md" className="mt-1 text-primary/70">
        {subtitle}
      </AppText>
    </View>
  );
}
