import React from 'react';
import { Pressable, Text } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { AppCard, AppCardDecoration } from '../AppCard';
import {
  CardAccessBoundary,
  CardAccessContext,
  CardLockOverlay,
} from '../CardAccess';

jest.mock('@/utils', () => jest.requireActual('@/utils/cn'));
jest.mock('uniwind', () => ({ useCSSVariable: () => '#7c3aed' }));
jest.mock('lucide-react-native', () => ({ LockKeyhole: 'LockKeyhole' }));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, options: { defaultValue: string }) =>
      options.defaultValue,
  }),
}));
jest.mock('../../AppIcon', () => ({
  AppIcon: () => null,
}));

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

test('locks cards and routes the overlay to premium until access is restored', () => {
  const openPremium = jest.fn();
  const onPress = jest.fn();
  const card = (locked: boolean) => (
    <CardAccessContext.Provider value={{ locked, openPremium }}>
      <AppCard>
        <Pressable testID="protected-action" onPress={onPress}>
          <Text>Continue</Text>
        </Pressable>
        <AppCard>
          <Text>Nested card</Text>
        </AppCard>
      </AppCard>
    </CardAccessContext.Provider>
  );

  act(() => {
    screen = create(card(true));
  });
  expect(screen.root.findAllByType(CardLockOverlay)).toHaveLength(1);
  const protectedContent = screen.root.findByProps({
    importantForAccessibility: 'no-hide-descendants',
  });
  expect(protectedContent.props.pointerEvents).toBe('none');
  const overlay = screen.root.findByProps({
    accessibilityLabel: 'Locked. Upgrade to Premium',
  });
  act(() => overlay.props.onPress());
  expect(openPremium).toHaveBeenCalledTimes(1);
  expect(onPress).not.toHaveBeenCalled();

  act(() => screen.update(card(false)));
  expect(screen.root.findAllByType(CardLockOverlay)).toHaveLength(0);
  act(() =>
    screen.root.findByProps({ testID: 'protected-action' }).props.onPress(),
  );
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('locks custom cards but leaves exempt cards available', () => {
  const openPremium = jest.fn();
  act(() => {
    screen = create(
      <CardAccessContext.Provider value={{ locked: true, openPremium }}>
        <CardAccessBoundary>
          <Text>Custom card</Text>
        </CardAccessBoundary>
        <AppCard lockExempt>
          <Text>Free feature</Text>
        </AppCard>
      </CardAccessContext.Provider>,
    );
  });
  expect(screen.root.findAllByType(CardLockOverlay)).toHaveLength(1);
  act(() => screen.root.findByType(CardLockOverlay).props.onPress());
  expect(openPremium).toHaveBeenCalledTimes(1);
  expect(screen.root.findByType(AppCard).props.lockExempt).toBe(true);
});
