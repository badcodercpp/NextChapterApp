import React from 'react';
import { TextInput } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { FormProvider, useForm } from 'react-hook-form';
import { CreatePasswordScreen } from '../CreatePasswordScreen';

const mockNavigate = jest.fn();

jest.mock('@/components', () => {
  const {
    View,
    Text,
    Pressable,
    TextInput: Input,
  } = jest.requireActual<typeof import('react-native')>('react-native');
  return {
    AppScreen: View,
    AppText: Text,
    AppPressable: Pressable,
    AppInput: Input,
    AppIcon: View,
  };
});

jest.mock('lucide-react-native', () => ({
  Check: 'Check',
  CircleCheck: 'CircleCheck',
  Eye: 'Eye',
  EyeOff: 'EyeOff',
  KeyRound: 'KeyRound',
  Lightbulb: 'Lightbulb',
  Lock: 'Lock',
  Mail: 'Mail',
  X: 'X',
}));

jest.mock('@/navigation/hooks', () => ({
  useScreenHeader: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@/form', () => jest.requireActual('@/form/schema/createPassword'));

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils/fieldError'),
  ...jest.requireActual('@/utils/cn'),
}));

function Harness({ email = 'reader@example.com' }: { email?: string }) {
  const form = useForm({
    defaultValues: {
      createAccount: { email },
      createPassword: { password: '', confirmPassword: '' },
    },
  });
  return (
    <FormProvider {...form}>
      <CreatePasswordScreen />
    </FormProvider>
  );
}

let screen: ReactTestRenderer;

beforeEach(() => jest.clearAllMocks());
afterEach(() => act(() => screen?.unmount()));

function renderScreen(email?: string) {
  act(() => {
    screen = create(<Harness email={email} />);
  });
  return screen.root;
}

async function enterPasswords(password: string, confirmation = password) {
  await act(async () => {
    const inputs = screen.root.findAllByType(TextInput);
    inputs[0].props.onChangeText(password);
    inputs[1].props.onChangeText(confirmation);
  });
}

async function submit() {
  await act(async () => {
    await screen.root
      .findByProps({ accessibilityLabel: 'Continue' })
      .props.onPress();
  });
}

test('masks the registration email and keeps both passwords hidden initially', () => {
  const root = renderScreen();
  const rendered = JSON.stringify(screen.toJSON());
  expect(rendered).toContain('r***r@example.com');
  expect(rendered).not.toContain('reader@example.com');
  root.findAllByType(TextInput).forEach(input => {
    expect(input.props.secureTextEntry).toBe(true);
  });
});

test('toggles each password independently', () => {
  const root = renderScreen();
  act(() => root.findAllByType(TextInput)[0].props.onEndIconPress());
  expect(root.findAllByType(TextInput)[0].props.secureTextEntry).toBe(false);
  expect(root.findAllByType(TextInput)[1].props.secureTextEntry).toBe(true);
  act(() => root.findAllByType(TextInput)[1].props.onEndIconPress());
  expect(root.findAllByType(TextInput)[1].props.secureTextEntry).toBe(false);
});

test('updates strength and all five rules immediately as the password changes', async () => {
  const root = renderScreen();
  await enterPasswords('Abcdef1!');
  expect(
    root.findByProps({
      accessibilityLabel: 'Password strength: strong, 5 of 5 rules met',
    }),
  ).toBeDefined();
  expect(
    root.findByProps({
      accessibilityLabel: 'Include lowercase letter: met',
    }),
  ).toBeDefined();
  await enterPasswords('');
  expect(
    root.findByProps({
      accessibilityLabel: 'Password strength: weak, 0 of 5 rules met',
    }),
  ).toBeDefined();
});

test('continues to email verification with valid matching passwords', async () => {
  renderScreen();
  await enterPasswords('Abcdef1!');
  await submit();
  expect(mockNavigate).toHaveBeenCalledWith('VerifyEmail');
});

test.each([
  ['Ab1!', 'Ab1!', 'Password must be at least 8 characters long'],
  [
    'abcdefgh',
    'abcdefgh',
    'Password must contain at least one special character',
  ],
  ['Abcdef1!', 'Abcdef2!', 'Passwords must match'],
  [
    'Abcdefghijklmnopqrs12!',
    'Abcdefghijklmnopqrs12!',
    'Password must not exceed 20 characters',
  ],
])('preserves validation for %s', async (password, confirmation, error) => {
  const root = renderScreen();
  await enterPasswords(password, confirmation);
  await submit();
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(
    root.findAllByType(TextInput).some(input => input.props.error === error),
  ).toBe(true);
});

test('does not show an email badge when no registration email is present', () => {
  renderScreen('');
  expect(JSON.stringify(screen.toJSON())).not.toContain('***');
});
