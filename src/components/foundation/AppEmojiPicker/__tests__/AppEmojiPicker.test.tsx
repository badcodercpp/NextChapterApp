import React from 'react';
import { Modal } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import {
  EmojiPicker,
  EmojiPickerThemeProvider,
} from '@hiraku-ai/react-native-emoji-picker';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppEmojiPicker } from '../AppEmojiPicker';

let mockColors: Record<string, string> = {};
jest.mock('uniwind', () => ({
  useCSSVariable: (name: string) => {
    if (!(name in mockColors)) throw new Error(`Missing color: ${name}`);
    return mockColors[name];
  },
}));
jest.mock('@hiraku-ai/react-native-emoji-picker', () => ({
  EmojiPicker: (props: Record<string, unknown>) => {
    const View = jest.requireActual('react-native').View;
    return <View {...props} />;
  },
  EmojiPickerThemeProvider: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
  }) => {
    const View = jest.requireActual('react-native').View;
    return <View {...props}>{children}</View>;
  },
}));

const stylesheet = readFileSync(
  join(__dirname, '../../../../global.css'),
  'utf8',
);
let screen: ReactTestRenderer;
afterEach(() => act(() => screen?.unmount()));

function setPalette(theme: string) {
  const block = stylesheet.match(
    new RegExp(`@variant ${theme}\\s*\\{\\s*:root\\s*\\{([^}]+)\\}`),
  );
  if (!block) throw new Error(`Missing theme: ${theme}`);
  mockColors = Object.fromEntries(
    [...block[1].matchAll(/(--color-[\w-]+):\s*(#[\da-f]+);/gi)].map(
      ([, name, value]) => [name, value],
    ),
  );
}
beforeEach(() => setPalette('light'));

describe.each(['light', 'dark', 'ocean'])('%s emoji picker', theme => {
  beforeEach(() => setPalette(theme));

  test.each(['default', 'v2'] as const)(
    '%s uses its own palette, including the modal surface',
    variant => {
      act(() => {
        screen = create(
          <AppEmojiPicker
            variant={variant}
            visible
            emojis={[]}
            onClose={jest.fn()}
            onEmojiSelect={jest.fn()}
          />,
        );
      });
      const colors = screen.root.findByType(EmojiPickerThemeProvider).props
        .theme.colors;
      const v2 = variant === 'v2';
      expect(colors.accent).toBe(
        mockColors[v2 ? '--color-primary-v2' : '--color-primary'],
      );
      expect(colors.iconActive).toBe(colors.accent);
      expect(colors.text).toBe(
        mockColors[v2 ? '--color-text-v2' : '--color-text'],
      );
      expect(colors.background).toBe(
        mockColors[v2 ? '--color-surface-v2' : '--color-card'],
      );
      expect(
        screen.root.findByProps({ className: 'overflow-hidden rounded-t-3xl' })
          .props.style.backgroundColor,
      ).toBe(colors.background);
    },
  );
});

test('preserves emoji selection and native dismissal callbacks', () => {
  const onClose = jest.fn();
  const onEmojiSelect = jest.fn();
  act(() => {
    screen = create(
      <AppEmojiPicker
        variant="v2"
        visible
        emojis={[]}
        onClose={onClose}
        onEmojiSelect={onEmojiSelect}
      />,
    );
  });
  act(() => {
    screen.root.findByType(EmojiPicker).props.onEmojiSelect('🌱');
    screen.root.findByType(Modal).props.onRequestClose();
  });
  expect(onEmojiSelect).toHaveBeenCalledWith('🌱');
  expect(onClose).toHaveBeenCalledTimes(1);
});
