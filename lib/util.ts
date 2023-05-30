import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const transformDuration = (duration: string) => {
  const totalSeconds = dayjs.duration(duration).asSeconds();
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.trunc(totalSeconds % 60);

  let transformedDuration = '';

  if (hours > 0) {
    transformedDuration += `${hours}:`;
  }

  transformedDuration += `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  return transformedDuration;
};

export const transformTimeStamp = (timestamp: string) => {
  const start = dayjs(timestamp);
  const now = dayjs();
  const hourDiff = now.diff(start, 'hour');

  if (hourDiff > 24 * 30 * 12) {
    const yearDiff = now.diff(start, 'year');
    return `${yearDiff} 年前`;
  }

  if (hourDiff > 24 * 30) {
    const monthDiff = now.diff(start, 'month');
    return `${monthDiff} 月前`;
  }

  if (hourDiff > 24) {
    const dayDiff = now.diff(start, 'day');
    return `${dayDiff} 天前`;
  }

  return `${hourDiff || 1} 小時前`;
};

export const transformViews = (views: string) => {
  const viewCount = +views;

  if (viewCount >= 10000) {
    const truncatedCount = Math.trunc(viewCount / 10000);
    return `${truncatedCount} 萬次`;
  }

  return `${viewCount} 次`;
};

