import React from 'react';
import { Text } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { AppHeaderOptions } from '../types';
import { NavigatorAppHeader } from '../AppHeader';

const mockGoBack = jest.fn();
let mockCanGoBack = true;

jest.mock('../../AppIcon', () => ({
  AppIcon: jest.requireActual('react-native').View,
}));
jest.mock('../../AppPressable', () => ({
  AppPressable: jest.requireActual('react-native').Pressable,
}));
jest.mock('../../AppText', () => ({
  AppText: jest.requireActual('react-native').Text,
}));
jest.mock('lucide-react-native', () => ({ ChevronLeft: 'ChevronLeft' }));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    canGoBack: () => mockCanGoBack,
    goBack: mockGoBack,
  }),
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 20 }),
}));

let screen: ReactTestRenderer;
beforeEach(() => {
  jest.clearAllMocks();
  mockCanGoBack = true;
});
afterEach(() => {
  act(() => {
    screen?.unmount();
  });
});

function render(options: AppHeaderOptions) {
  const props = {
    options,
    navigation: { canGoBack: () => mockCanGoBack },
  } as unknown as NativeStackHeaderProps;
  act(() => {
    screen = create(<NavigatorAppHeader {...props} />);
  });
}

function pressBack() {
  act(() => {
    screen.root.findByProps({ accessibilityLabel: 'Go back' }).props.onPress();
  });
}

test('renders title, subtitle, accessory and right action in the top bar', () => {
  const onShare = jest.fn();
  render({
    title: 'Recovery Progress',
    subtitle: 'Track your healing journey',
    headerTitleAccessory: () => <Text>dot</Text>,
    headerRight: () => (
      <Text accessibilityLabel="Share" onPress={onShare}>
        share
      </Text>
    ),
  });

  const output = JSON.stringify(screen.toJSON());
  expect(output).toContain('Recovery Progress');
  expect(output).toContain('Track your healing journey');
  expect(output).toContain('dot');

  act(() => {
    screen.root.findByProps({ accessibilityLabel: 'Share' }).props.onPress();
  });
  expect(onShare).toHaveBeenCalledTimes(1);

  pressBack();
  expect(mockGoBack).toHaveBeenCalledTimes(1);
});

test('does not go back when disabled or without a previous screen', () => {
  render({ title: 'Journal', backDisabled: true });
  pressBack();
  act(() => {
    screen.unmount();
  });

  mockCanGoBack = false;
  render({ title: 'Journal' });
  pressBack();
  expect(mockGoBack).not.toHaveBeenCalled();
});
