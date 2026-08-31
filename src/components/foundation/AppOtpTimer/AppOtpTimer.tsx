import { Pressable, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { AppOtpTimerProps } from './types';
import { AppText } from '@/components/foundation/AppText';

export const AppOtpTimer: React.FC<AppOtpTimerProps> = ({
  minute,
  second,
  labeltext = 'Resend OTP',
  onResendPress,
}) => {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Convert initial props to total seconds
  const totalSeconds = minute * 60 + second;

  useEffect(() => {
    // Start countdown sequence when timer becomes active
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Critical Cleanup: clear interval if the component unmounts mid-count
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, timeLeft]);

  const handleResendOtp = () => {
    if (isTimerActive) return; // Prevent double-clicks while counting down

    setTimeLeft(totalSeconds);
    setIsTimerActive(true);

    // Call external API trigger if supplied by parent container
    if (onResendPress) {
      onResendPress();
    }
  };

  // Format total seconds back into MM:SS string structure
  const formatTime = (totalSecs: number): string => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;

    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');

    return `${formattedMins}:${formattedSecs}`;
  };

  return (
    <View className="justify-canter items-center">
      <Pressable
        disabled={isTimerActive} // Lock button touch capabilities during countdowns
        hitSlop={{ top: 5, bottom: 5, left: 50, right: 50 }}
        onPress={handleResendOtp}
      >
        {isTimerActive ? (
          <AppText variant="md" className="text-text-secondary">
            {formatTime(timeLeft)}
          </AppText>
        ) : (
          <AppText variant="md" className="text-text-secondary underline">
            {labeltext.trim().length > 0 ? labeltext : 'Resend OTP'}
          </AppText>
        )}
      </Pressable>
    </View>
  );
};

export default AppOtpTimer;
