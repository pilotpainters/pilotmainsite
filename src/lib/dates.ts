const monthYearFmt = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const fullDateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return monthYearFmt.format(date);
}

export function formatFullDate(date: Date): string {
  return fullDateFmt.format(date);
}
