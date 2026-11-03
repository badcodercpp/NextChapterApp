import React from 'react';
import { TextInput } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { AppInput } from '../AppInput';

jest.mock('../../AppIcon', () => ({
  AppIcon: jest.requireActual('react-native').View,
}));
jest.mock('lucide-react-native', () => ({ X: 'X' }));
jest.mock('@/utils', () => jest.requireActual('@/utils/cn'));

let screen: ReactTestRenderer;
afterEach(() => act(() => screen?.unmount()));

test.each([
  ['default', 'accent-text-secondary', 'border-primary'],
  ['v2', 'accent-text-muted-v2', 'border-primary-v2'],
] as const)(
  '%s keeps its own placeholder and focus palette',
  (variant, placeholder, border) => {
    act(() => {
      screen = create(<AppInput variant={variant} value="" />);
    });
    const input = screen.root.findByType(TextInput);
    expect(input.props.placeholderTextColorClassName).toBe(placeholder);
    act(() => input.props.onFocus({}));
    expect(JSON.stringify(screen.toJSON())).toContain(border);
    act(() => input.props.onBlur({}));
    expect(JSON.stringify(screen.toJSON())).not.toContain(border);
  },
);

test('v2 keeps the error border when focused', () => {
  act(() => {
    screen = create(<AppInput variant="v2" value="" error="Invalid email" />);
  });
  act(() => screen.root.findByType(TextInput).props.onFocus({}));
  const rendered = JSON.stringify(screen.toJSON());
  expect(rendered).toContain('border-error');
  expect(rendered).not.toContain('border-primary-v2');
});
