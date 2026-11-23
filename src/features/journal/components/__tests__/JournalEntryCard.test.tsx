import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { JournalEntryCard } from '../JournalEntryCard';
import { JournalEntryMenu } from '../JournalEntryMenu';

jest.mock('@/components', () => {
  const { View, Text } = jest.requireActual('react-native');
  return {
    AppCard: View,
    AppIcon: View,
    AppText: Text,
    AppExpandableText: ({ text }: { text: string }) => <Text>{text}</Text>,
  };
});
jest.mock('@/utils', () => ({ getMoodEmojiByValue: () => 'mood' }));
jest.mock('lucide-react-native', () => ({ CalendarDays: 'CalendarDays' }));
jest.mock('../JournalEntryMenu', () => ({
  JournalEntryMenu: () => <></>,
}));

test('clips artwork to the card without clipping the menu', () => {
  const entry = {
    id: '1',
    day: 11,
    title: 'Journal entry',
    content: 'Journal content',
    mood: null,
    entryDate: '2026-11-03',
    createdAt: null,
    updatedAt: null,
  };
  let screen: ReactTestRenderer;
  act(() => {
    screen = create(<JournalEntryCard entry={entry} origin="JournalHistory" />);
  });

  const card = screen!.root.findByType(JournalEntryCard);
  const artwork = card.findByProps({ pointerEvents: 'none' });
  expect(artwork.props.className).toContain('overflow-hidden');
  expect(artwork.props.className).toContain('rounded-[26px]');
  expect(
    artwork.findAll(node => node.props.className?.includes('rounded-tl-full'))
      .length,
  ).toBeGreaterThan(0);
  expect(JSON.stringify(screen!.toJSON())).toContain('Journal content');
  expect(card.findByType(JournalEntryMenu).props.entry).toBe(entry);
  expect(artwork.findAllByType(JournalEntryMenu)).toHaveLength(0);
  act(() => screen!.unmount());
});
