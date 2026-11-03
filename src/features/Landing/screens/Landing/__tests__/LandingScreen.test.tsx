import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { LandingScreen } from '../LandingScreen';
import { useScreenHeader } from '@/navigation/hooks';

const mockNavigate = jest.fn();

jest.mock('@/components', () => {
  const { View, Text, Pressable } =
    jest.requireActual<typeof import('react-native')>('react-native');
  return {
    AppScreen: View,
    AppText: Text,
    AppPressable: Pressable,
    AppIcon: View,
  };
});

jest.mock('lucide-react-native', () => ({
  ArrowRightIcon: 'ArrowRightIcon',
}));

jest.mock('@/assets/icons/svg/app_logo.svg', () => 'AppLogo');

jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Defs: 'Defs',
  LinearGradient: 'LinearGradient',
  Rect: 'Rect',
  Stop: 'Stop',
}));

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#130f2c',
}));

jest.mock('@/navigation/hooks', () => ({
  useScreenHeader: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

let screen: ReactTestRenderer;

beforeEach(() => {
  jest.clearAllMocks();
  act(() => {
    screen = create(<LandingScreen />);
  });
});

afterEach(() => act(() => screen.unmount()));

test('shows NextChapter branding and hides the old landing header', () => {
  const rendered = JSON.stringify(screen.toJSON());
  expect(rendered).toContain('NextChapter');
  expect(rendered).toContain('AI RECOVERY COMPANION');
  expect(rendered).toContain(
    'Every ending is the beginning of your next chapter.',
  );
  expect(rendered).not.toContain('Outdated Me');
  expect(useScreenHeader).toHaveBeenCalledWith({ headerShown: false });
});

test.each([
  ['Begin Your Journey', 'WhatBringsYouHere'],
  ['Log In', 'Login'],
])('preserves %s navigation', (label, route) => {
  act(() => {
    screen.root.findByProps({ accessibilityLabel: label }).props.onPress();
  });

  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith(route);
});

test('extends artwork below the bottom safe area and leaves login unboxed', () => {
  const tree = JSON.stringify(screen.toJSON());
  expect(screen.root.findByProps({ safeBottom: false })).toBeDefined();
  expect(tree).not.toContain('bg-background-v2/80');
  expect(tree).not.toContain('bg-background-v2/20');
  expect(tree).toContain('landing-artwork-fade');
  expect(tree).toContain(
    'Every ending is the beginning of\\nyour next chapter.',
  );
});
