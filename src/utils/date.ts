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

export const getGreetingKey = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'app.locale.home.greeting.morning';
  }

  if (hour >= 12 && hour < 17) {
    return 'app.locale.home.greeting.afternoon';
  }

  if (hour >= 17 && hour < 18) {
    return 'app.locale.home.greeting.evening';
  }

  if (hour >= 18 && hour < 20) {
    return 'app.locale.home.greeting.twilight';
  }

  if (hour >= 20 && hour < 22) {
    return 'app.locale.home.greeting.lateEvening';
  }

  return 'app.locale.home.greeting.night';
};
