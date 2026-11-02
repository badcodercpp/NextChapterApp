import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { RecoveryStartsTodayScreen } from '../RecoveryStartsTodayScreen';
import { useScreenHeader } from '@/navigation/hooks';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
let mockTotalDays: number | undefined = 30;

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
  ArrowRight: 'ArrowRight',
  CalendarDays: 'CalendarDays',
  ChevronLeft: 'ChevronLeft',
  Heart: 'Heart',
  Lock: 'Lock',
  Sprout: 'Sprout',
  Target: 'Target',
}));
jest.mock('@/navigation/hooks', () => ({ useScreenHeader: jest.fn() }));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}));
jest.mock('@/state/selectors', () => ({ selectApplicationConfig: jest.fn() }));
jest.mock('react-redux', () => ({
  useSelector: () => ({ data: { totalProgramDays: mockTotalDays } }),
}));

let screen: ReactTestRenderer;

beforeEach(() => {
  jest.clearAllMocks();
  mockTotalDays = 30;
});
afterEach(() => act(() => screen?.unmount()));

function renderScreen() {
  act(() => {
    screen = create(<RecoveryStartsTodayScreen />);
  });
}

test('shows every recovery card and uses the configured program duration', () => {
  renderScreen();
  const rendered = JSON.stringify(screen.toJSON());
  for (const text of [
    'Day 1',
    'Focus',
    "You're not alone",
    'Healing is not a race.',
  ]) {
    expect(rendered).toContain(text);
  }
  expect(rendered).toContain('30');
  expect(useScreenHeader).toHaveBeenCalledWith({ headerShown: false });
});

test('does not render a broken duration when configuration is unavailable', () => {
  mockTotalDays = undefined;
  renderScreen();
  expect(JSON.stringify(screen.toJSON())).not.toContain(' days');
});

test('Start My Journey opens the recovery reason screen', () => {
  renderScreen();
  act(() => {
    screen.root
      .findByProps({ accessibilityLabel: 'Start My Journey' })
      .props.onPress();
  });
  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith('WhatBringsYouHere');
});

test('replacement back button goes back', () => {
  renderScreen();
  act(() => {
    screen.root.findByProps({ accessibilityLabel: 'Go back' }).props.onPress();
  });
  expect(mockGoBack).toHaveBeenCalledTimes(1);
});
