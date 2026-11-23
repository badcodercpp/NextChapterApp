import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { SettingsNavigator } from '../SettingsNavigator';

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: jest.requireActual('react-native').View,
    Screen: jest.requireActual('react-native').View,
  }),
}));
jest.mock('@/components', () => ({ NavigatorAppHeader: () => null }));
jest.mock('../../screens', () => ({ SettingsScreen: () => null }));

test('provides a title to the custom Settings header', () => {
  let screen: ReactTestRenderer;
  act(() => {
    screen = create(<SettingsNavigator />);
  });
  expect(
    screen!.root.findByProps({ name: 'SettingsScreen' }).props.options,
  ).toMatchObject({ title: 'Settings', headerShown: true });
  act(() => screen!.unmount());
});
