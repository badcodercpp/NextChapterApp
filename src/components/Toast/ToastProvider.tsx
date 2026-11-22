import { Animated, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { registerToastListener } from './Toast';

type ToastType = 'success' | 'error' | 'info';

export const ToastProvider: React.FC = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');
  const [visible, setVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const toastIdRef = useRef(0);
  const mountedRef = useRef(false);

  const clearCurrentToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    animationRef.current?.stop();
    animationRef.current = null;
  }, []);

  const hideToast = useCallback(
    (toastId: number) => {
      if (!mountedRef.current || toastId !== toastIdRef.current) {
        return;
      }

      const animation = Animated.parallel([
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
      ]);

      animationRef.current = animation;

      animation.start(({ finished }) => {
        if (finished && mountedRef.current && toastId === toastIdRef.current) {
          setVisible(false);
          animationRef.current = null;
        }
      });
    },
    [fadeAnim, slideAnim],
  );

  const show = useCallback(
    (msg: string, toastType: ToastType, duration = 3000) => {
      if (!mountedRef.current) {
        return;
      }

      clearCurrentToast();

      const toastId = ++toastIdRef.current;

      setMessage(msg);
      setType(toastType);
      setVisible(true);

      fadeAnim.setValue(0);
      slideAnim.setValue(20);

      const showAnimation = Animated.parallel([
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
      ]);

      animationRef.current = showAnimation;
      showAnimation.start();

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        hideToast(toastId);
      }, Math.max(0, duration));
    },
    [clearCurrentToast, fadeAnim, slideAnim, hideToast],
  );

  useEffect(() => {
    mountedRef.current = true;

    registerToastListener(show);

    return () => {
      mountedRef.current = false;

      // Invalidate any pending animation callbacks.
      toastIdRef.current += 1;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      animationRef.current?.stop();
      animationRef.current = null;

      registerToastListener(null);
    };
  }, [show]);

  if (!visible) {
    return null;
  }

  const bgStyles: Record<ToastType, string> = {
    success: 'bg-emerald-600',
    error: 'bg-rose-600',
    info: 'bg-zinc-800',
  };

  return (
    <View
      pointerEvents="none"
      className="absolute bottom-16 left-0 right-0 z-50 mx-6 items-center justify-center"
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className={`w-full rounded-full px-6 py-3 shadow-xl ${bgStyles[type]}`}
      >
        <Text className="text-center text-sm font-semibold tracking-wide text-white">
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};
