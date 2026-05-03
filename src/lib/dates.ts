const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: Date): string {
  return formatter.format(date);
}
