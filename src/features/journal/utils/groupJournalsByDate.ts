import { Journal } from '../types';
import { JournalSection } from '../components/JournalList';
import dayjs from 'dayjs';

export const groupJournalsByDate = (journals: Journal[]): JournalSection[] => {
  const grouped = new Map<string, Journal[]>();

  journals.forEach(journal => {
    const date = dayjs(journal.createdAt);

    let key = date.format('DD MMMM YYYY');

    if (date.isSame(dayjs(), 'day')) {
      key = 'Today';
    } else if (date.isSame(dayjs().subtract(1, 'day'), 'day')) {
      key = 'Yesterday';
    }

    const items = grouped.get(key) ?? [];

    items.push(journal);

    grouped.set(key, items);
  });

  return [...grouped.entries()].map(([title, data]) => ({
    title,
    data,
  }));
};
