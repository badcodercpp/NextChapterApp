import React from 'react';
import { Pressable, Text } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { AppCard, AppCardDecoration } from '../AppCard';

jest.mock('@/utils', () => jest.requireActual('@/utils/cn'));

let screen: ReactTestRenderer;

afterEach(() => {
  act(() => screen?.unmount());
});

test('decorates content without intercepting interaction or accessibility', () => {
  const onPress = jest.fn();
  act(() => {
    screen = create(
      <AppCard decorated>
        <Pressable testID="card-action" onPress={onPress}>
          <Text>Continue</Text>
        </Pressable>
      </AppCard>,
    );
  });

  const decoration = screen.root.findByType(AppCardDecoration);
  const background = decoration.findByProps({ pointerEvents: 'none' });
  expect(background.props.accessibilityElementsHidden).toBe(true);
  expect(background.props.importantForAccessibility).toBe(
    'no-hide-descendants',
  );
  const action = screen.root.findAllByProps({ testID: 'card-action' })[0];
  act(() => action.props.onPress());
  expect(onPress).toHaveBeenCalledTimes(1);
  expect(JSON.stringify(screen.toJSON())).toContain('Continue');
});

test('leaves existing card designs unchanged unless decoration is requested', () => {
  act(() => {
    screen = create(
      <AppCard>
        <Text>Existing design</Text>
      </AppCard>,
    );
  });
  expect(screen.root.findAllByType(AppCardDecoration)).toHaveLength(0);
});
