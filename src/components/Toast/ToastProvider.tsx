import { Animated, Text, View } from 'react-native';
// src/components/Toast/ToastProvider.tsx
import React, { useEffect, useRef, useState } from 'react';

import { registerToastListener } from './Toast';

export const ToastProvider: React.FC = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const [visible, setVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    registerToastListener((msg, toastType, duration) => {
      setMessage(msg);
      setType(toastType);
      setVisible(true);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 20,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => setVisible(false));
      }, duration);
    });
  }, [fadeAnim, slideAnim]);

  if (!visible) return null;

  const bgStyles = {
    success: 'bg-emerald-600',
    error: 'bg-rose-600',
    info: 'bg-zinc-800',
  };

  return (
    <View
      pointerEvents="none"
      className="absolute bottom-16 left-0 right-0 z-50 items-center justify-center mx-6"
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }], // Animation tracking properties must stay in native style object
        }}
        className={`px-6 py-3 rounded-full shadow-xl w-full ${bgStyles[type]}`}
      >
        <Text className="text-white text-sm font-semibold tracking-wide text-center">
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};
