import dayjs from 'dayjs';

export function formatDate(date: Date, format: string = 'DD MMM YYYY'): string {
  return dayjs(date).format(format);
}
