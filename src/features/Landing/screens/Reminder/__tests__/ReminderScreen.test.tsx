import React from 'react';
import { Switch } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { ReminderScreen } from '../ReminderScreen';
import { useScreenHeader } from '@/navigation/hooks';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

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
  Bell: 'Bell',
  CalendarDays: 'CalendarDays',
  ChevronLeft: 'ChevronLeft',
  Heart: 'Heart',
  Lock: 'Lock',
  Moon: 'Moon',
}));
jest.mock('@/navigation/hooks', () => ({ useScreenHeader: jest.fn() }));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}));

let screen: ReactTestRenderer;

beforeEach(() => {
  jest.clearAllMocks();
  act(() => {
    screen = create(<ReminderScreen />);
  });
});
afterEach(() => act(() => screen.unmount()));

test('shows every reminder benefit and hides the old header', () => {
  const rendered = JSON.stringify(screen.toJSON());
  for (const title of [
    'Daily check-ins',
    'Stay consistent',
    "You're in control",
  ]) {
    expect(rendered).toContain(title);
  }
  expect(useScreenHeader).toHaveBeenCalledWith({ headerShown: false });
});

test('keeps reminders enabled initially and allows toggling both ways', () => {
  expect(screen.root.findByType(Switch).props.value).toBe(true);
  act(() => screen.root.findByType(Switch).props.onValueChange(false));
  expect(screen.root.findByType(Switch).props.value).toBe(false);
  act(() => screen.root.findByType(Switch).props.onValueChange(true));
  expect(screen.root.findByType(Switch).props.value).toBe(true);
});

test.each([
  ['Continue', true],
  ['Continue', false],
  ['Maybe later', true],
  ['Maybe later', false],
])('preserves %s navigation when reminders are %s', (label, enabled) => {
  act(() => screen.root.findByType(Switch).props.onValueChange(enabled));
  act(() => {
    screen.root.findByProps({ accessibilityLabel: label }).props.onPress();
  });
  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith('RecoveryStartsToday');
});

test('supports the replacement back control', () => {
  act(() => {
    screen.root.findByProps({ accessibilityLabel: 'Go back' }).props.onPress();
  });
  expect(mockGoBack).toHaveBeenCalledTimes(1);
});
