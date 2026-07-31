import dayjs from 'dayjs';

export function formatJournalDateTime(date: Date | string): string {
  const journalDate = dayjs(date);
  const now = dayjs();

  if (journalDate.isSame(now, 'day')) {
    return `Today • ${journalDate.format('h:mm A')}`;
  }

  if (journalDate.isSame(now.subtract(1, 'day'), 'day')) {
    return `Yesterday • ${journalDate.format('h:mm A')}`;
  }

  if (journalDate.isSame(now, 'year')) {
    return journalDate.format('D MMM • h:mm A');
  }

  return journalDate.format('D MMM YYYY • h:mm A');
}
