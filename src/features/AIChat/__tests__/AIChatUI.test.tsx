import React from 'react';
import { TextInput } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { AiChatRole } from '@/__generated__/graphql';
import { MasterFormData } from '@/form/types';
import { AIChatComponent } from '../components/AIChatComponent';
import { AIChatMessage } from '../components/AIChatMessage';
import { AICoachCard } from '../components/AICoachCard';
import { ChatComposer } from '../components/ChatComposer';
import { QuickReplies } from '../components/QuickReplies';
import { AIChatScreen } from '../screens/AIChatScreen';

const mockSend = jest.fn();
const mockGoBack = jest.fn();
let mockPending = false;
let mockCanGoBack = true;
let mockLatest: { quickReplies?: string[] } = {};
let mockLoading = false;

jest.mock('@/components', () => {
  const {
    View,
    Text,
    TextInput: Input,
    Pressable,
  } = jest.requireActual<typeof import('react-native')>('react-native');
  return {
    AppScreen: View,
    AppText: Text,
    AppPressable: Pressable,
    AppIcon: View,
    AppInput: Input,
    AppEmojiPicker: View,
    AppExpandableText: ({
      text,
      textClassName,
    }: {
      text: string;
      textClassName: string;
    }) => <Text className={textClassName}>{text}</Text>,
    AppContentLoader: () => <Text>Loading conversation</Text>,
    AppContentSingleLineLoader: () => <Text>Loading replies</Text>,
  };
});
jest.mock('lucide-react-native', () => ({
  Bot: 'Bot',
  CheckCheck: 'CheckCheck',
  ChevronLeft: 'ChevronLeft',
  Heart: 'Heart',
  Headphones: 'Headphones',
  Lock: 'Lock',
  Plus: 'Plus',
  Send: 'Send',
  Sparkles: 'Sparkles',
  Sprout: 'Sprout',
}));
jest.mock('@hiraku-ai/react-native-emoji-picker', () => ({ emojiData: [] }));
jest.mock('@/__generated__/graphql', () => ({
  AiChatRole: { User: 'USER', Assistant: 'ASSISTANT' },
}));
jest.mock('@/state/selectors', () => ({
  selectMe: 'me',
  selectApplicationConfig: 'config',
  selectMyAiChatConversations: 'conversations',
  selectLatestAiChatMessage: 'latest',
}));
jest.mock('react-redux', () => ({
  useSelector: (selector: string) => {
    switch (selector) {
      case 'me':
        return { data: { displayName: 'Ajay' } };
      case 'config':
        return {
          data: { aiCoachMessage: 'Your configured coach introduction.' },
        };
      case 'latest':
        return { data: mockLatest, loading: mockLoading };
      case 'conversations':
        return {
          loading: mockLoading,
          data: [
            {
              messages: [
                {
                  id: '1',
                  role: 'ASSISTANT',
                  content: 'How are you feeling?',
                  createdAt: '2026-11-03T08:00:00Z',
                },
                {
                  id: '2',
                  role: 'USER',
                  content: 'Feeling hopeful today.',
                  createdAt: '2026-11-03T08:01:00Z',
                },
              ],
            },
          ],
        };
      default:
        throw new Error(`Unexpected selector: ${selector}`);
    }
  },
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack, canGoBack: () => mockCanGoBack }),
}));
jest.mock('../hooks/useAIChatBootstrap', () => ({
  useAIChatBootstrap: jest.fn(),
}));
jest.mock('../hooks/useAIChatSendMessageBootstrap', () => ({
  useAIChatSendMessageBootstrap: () => ({
    sendAiChatMessage: mockSend,
    isBootstrapPending: mockPending,
  }),
}));

let screen: ReactTestRenderer;
let form: UseFormReturn<MasterFormData>;
function Harness({ children }: { children: React.ReactNode }) {
  form = useForm<MasterFormData>({
    defaultValues: { aiChat: { message: '' } },
  });
  return <FormProvider {...form}>{children}</FormProvider>;
}
function render(element: React.ReactElement) {
  act(() => {
    screen = create(<Harness>{element}</Harness>);
  });
}
function press(label: string) {
  act(() =>
    screen.root.findByProps({ accessibilityLabel: label }).props.onPress(),
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  mockLatest = {};
  mockPending = false;
  mockCanGoBack = true;
  mockLoading = false;
});
afterEach(() => act(() => screen?.unmount()));

test('preserves the personalized greeting and configured introduction', () => {
  render(<AICoachCard />);
  const output = JSON.stringify(screen.toJSON());
  expect(output).toContain('Ajay');
  expect(output).toContain('Your configured coach introduction.');
  expect(output).toContain('bg-surface-v2');
  expect(output).toContain('text-on-primary-v2');
});

test.each([AiChatRole.User, AiChatRole.Assistant])(
  '%s messages keep content, timestamps, and theme-aware foregrounds',
  role => {
    render(
      <AIChatMessage
        message={{
          id: '1',
          role,
          content: 'A real conversation message',
          createdAt: '2 minutes ago',
        }}
      />,
    );
    const output = JSON.stringify(screen.toJSON());
    expect(output).toContain('A real conversation message');
    expect(output).toContain('2 minutes ago');
    expect(output).toContain(
      role === AiChatRole.User ? 'text-on-primary-v2' : 'text-text-v2',
    );
    expect(output).toContain(
      role === AiChatRole.User ? 'bg-primary-v2' : 'bg-input-v2',
    );
    expect(output).not.toContain('CheckCheck');
  },
);

test('keeps sending disabled for empty/short messages and preserves send payload', () => {
  render(<ChatComposer onSend={mockSend} />);
  const send = () =>
    screen.root.findByProps({ accessibilityLabel: 'Send message' });
  expect(send().props.disabled).toBe(true);
  act(() => {
    screen.root.findByType(TextInput).props.onChangeText('hi');
  });
  expect(send().props.disabled).toBe(true);
  act(() => {
    screen.root.findByType(TextInput).props.onChangeText('I need support');
  });
  expect(send().props.disabled).toBe(false);
  press('Send message');
  expect(mockSend).toHaveBeenCalledWith({ message: 'I need support' });
  expect(screen.root.findByType(TextInput).props.placeholder).toBe(
    'Type your message...',
  );
  expect(screen.root.findByType(TextInput).props.variant).toBe('v2');
});

test.each([{ disabled: true }, { isBootstrapPending: true }])(
  'blocks input, emoji selection, and sending while %o',
  props => {
    render(<ChatComposer onSend={mockSend} {...props} />);
    act(() => form.setValue('aiChat.message', 'I need support'));
    expect(screen.root.findByType(TextInput).props.disabled).toBe(true);
    expect(
      screen.root.findByProps({ accessibilityLabel: 'Add emoji' }).props
        .disabled,
    ).toBe(true);
    expect(
      screen.root.findByProps({ accessibilityLabel: 'Send message' }).props
        .disabled,
    ).toBe(true);
    press('Send message');
    expect(mockSend).not.toHaveBeenCalled();
  },
);

test('preserves form errors and clears them when the composer receives focus', () => {
  render(<ChatComposer onSend={mockSend} />);
  act(() => {
    form.setValue('aiChat.message', 'I need support');
    form.setError('aiChat.message', { message: 'Message too short' });
  });
  expect(
    screen.root.findByProps({ accessibilityLabel: 'Send message' }).props
      .disabled,
  ).toBe(true);
  act(() => screen.root.findByType(TextInput).props.onFocus());
  expect(
    screen.root.findByProps({ accessibilityLabel: 'Send message' }).props
      .disabled,
  ).toBe(false);
});

test('opens the themed picker and appends emojis without replacing existing text', () => {
  render(<ChatComposer />);
  act(() => form.setValue('aiChat.message', 'Hello'));
  press('Add emoji');
  const picker = screen.root.findByProps({ visible: true, variant: 'v2' });
  act(() => {
    picker.props.onEmojiSelect('🌱');
    picker.props.onEmojiSelect('💙');
  });
  expect(form.getValues('aiChat.message')).toBe('Hello 🌱 💙');
  act(() => picker.props.onClose());
  expect(
    screen.root.findByProps({ visible: false, variant: 'v2' }),
  ).toBeDefined();
});

test('default quick replies retain their send actions', () => {
  render(<QuickReplies onSend={mockSend} />);
  press('Help me manage overthinking');
  expect(mockSend).toHaveBeenCalledWith({
    message: 'Help me manage overthinking',
  });
});

test('uses all server-provided replies, including more than three', () => {
  mockLatest = { quickReplies: ['First', 'Second', 'Third', 'Fourth'] };
  render(<QuickReplies onSend={mockSend} />);
  press('Fourth');
  expect(mockSend).toHaveBeenCalledWith({ message: 'Fourth' });
  expect(JSON.stringify(screen.toJSON())).not.toContain(
    'Help me manage overthinking',
  );
});

test('prevents quick reply sends while a response is pending', () => {
  render(<QuickReplies onSend={mockSend} isBootstrapPending />);
  expect(
    screen.root.findByProps({ accessibilityLabel: 'Motivate me today' }).props
      .disabled,
  ).toBe(true);
  press('Motivate me today');
  expect(mockSend).not.toHaveBeenCalled();
});

test('renders real history and shows the typing indicator only while pending', () => {
  render(<AIChatComponent onSend={mockSend} />);
  expect(
    screen.root
      .findAllByType(AIChatMessage)
      .map(node => node.props.message.content),
  ).toEqual(['How are you feeling?', 'Feeling hopeful today.']);
  expect(
    screen.root.findAllByProps({ accessibilityLabel: 'Coach is replying' }),
  ).toHaveLength(0);
  act(() =>
    screen.update(
      <Harness>
        <AIChatComponent onSend={mockSend} isBootstrapPending />
      </Harness>,
    ),
  );
  expect(
    screen.root.findByProps({ accessibilityLabel: 'Coach is replying' }),
  ).toBeDefined();
});

test('keeps the existing initial loading state', () => {
  mockLoading = true;
  render(<AIChatComponent />);
  expect(JSON.stringify(screen.toJSON())).toContain('Loading conversation');
  expect(JSON.stringify(screen.toJSON())).not.toContain('How are you feeling?');
});

test('screen provides themed keyboard-aware layout and a working back action', () => {
  render(<AIChatScreen />);
  expect(screen.root.findByProps({ keyboard: true }).props.className).toBe(
    'bg-background-v2',
  );
  press('Go back');
  expect(mockGoBack).toHaveBeenCalledTimes(1);
  for (const unsupported of ['Photo', 'Voice', 'File', 'History']) {
    expect(
      screen.root.findAllByProps({ accessibilityLabel: unsupported }),
    ).toHaveLength(0);
  }
});

test('keeps the previous header behavior when no back destination exists', () => {
  mockCanGoBack = false;
  render(<AIChatScreen />);
  press('Go back');
  expect(mockGoBack).not.toHaveBeenCalled();
});
