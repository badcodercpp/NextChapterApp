export function formatDate(date: string | null): string {
  if (!date) {
    return '';
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return parsedDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function startOfDay(date: Date): Date {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

export function endOfDay(date: Date): Date {
  const result = new Date(date);

  result.setHours(23, 59, 59, 999);

  return result;
}
