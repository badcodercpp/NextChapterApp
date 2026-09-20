import { Animated, Easing, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useEffect, useRef, useState } from 'react';

import { AppText } from '@/components';

interface RedirectCountdownProps {
  duration?: number;
  message?: string;
  onComplete?: () => void;
}

const SIZE = 80;
const STROKE_WIDTH = 7;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function RedirectCountdown({
  duration = 5,
  message = 'Redirecting to Profile...',
  onComplete,
}: RedirectCountdownProps) {
  const [seconds, setSeconds] = useState(duration);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSeconds(duration);

    progress.setValue(0);

    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: duration * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished) {
        onComplete?.();
      }
    });

    const interval = setInterval(() => {
      setSeconds(current => {
        if (current <= 1) {
          clearInterval(interval);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      animation.stop();
    };
  }, [duration, onComplete, progress]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  return (
    <View className="flex-1 items-center justify-center bg-background">
      {/* Countdown Circle */}
      <View
        className="relative items-center justify-center"
        style={{
          width: SIZE,
          height: SIZE,
        }}
      >
        <Svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            transform: [{ rotate: '-90deg' }],
          }}
        >
          {/* Background Ring */}
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />

          {/* Progress Ring */}
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="#A855F7"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>

        {/* Number */}
        <AppText variant="lg" className="font-medium leading-none text-white">
          {seconds}
        </AppText>

        {/* Seconds */}
        <AppText variant="md" className="mt-1 text-text-muted">
          sec
        </AppText>
      </View>

      {/* Redirect Message */}
      <AppText variant="xl" className="mt-4 text-center text-text-muted">
        {message}
      </AppText>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
