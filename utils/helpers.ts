import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatDuration = (duration: string) => {
  const totalSeconds = dayjs.duration(duration).asSeconds();
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.trunc(totalSeconds % 60);

  let transformedDuration = '';

  if (hours > 0) {
    transformedDuration += `${hours}:`;
  }

  const transformedMinutes = minutes.toString().padStart(2, '0');
  const transformedSeconds = seconds.toString().padStart(2, '0');

  transformedDuration += `${transformedMinutes}:${transformedSeconds}`;

  return transformedDuration;
};

export const formatTimeStamp = (timestamp: string) => {
  const startDate = dayjs(timestamp);
  const now = dayjs();
  const duration = {
    year: now.diff(startDate, 'years'),
    month: now.diff(startDate, 'month'),
    day: now.diff(startDate, 'day'),
    hour: now.diff(startDate, 'hour'),
  };

  if (duration.year > 0) {
    return `${duration.year} 年前`;
  }

  if (duration.month > 0) {
    return `${duration.month} 月前`;
  }

  if (duration.day > 0) {
    return `${duration.day} 天前`;
  }

  return `${duration.hour || 1} 小時前`;
};

export const formatViews = (views: string) => {
  return new Intl.NumberFormat('zh-TW', {
    notation: 'compact',
  }).format(parseInt(views));
};

// TODO: https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
export const transformCounts = (counts: string) => {
  const countNumber = Number(counts);
  return countNumber >= 10000
    ? `${Math.trunc(countNumber / 10000)} 萬`
    : `${countNumber}`;
};

export const removeDuplicates = <T>(path: string, items: T[] = []): T[] => {
  const map = new Map();

  items.forEach((item) => {
    const splitedPath = path.split('.');
    let key: any = item;
    for (const pathSegment of splitedPath) {
      key = key[pathSegment];
    }
    map.set(key, item);
  });

  return [...Array.from(map.values())];
};
