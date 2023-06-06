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

  const transformedMinutes = minutes.toString().padStart(2, '0');
  const transformedSeconds = seconds.toString().padStart(2, '0');

  transformedDuration += `${transformedMinutes}:${transformedSeconds}`;

  return transformedDuration;
};

export const transformTimeStamp = (timestamp: string) => {
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

export const transformViews = (views: string) => {
  const viewCount = +views;

  if (viewCount >= 10000) {
    const truncatedCount = Math.trunc(viewCount / 10000);
    return `${truncatedCount} 萬次`;
  }

  return `${viewCount} 次`;
};

// TODO: https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
export const transformCounts = (counts: string) => {
  const countNumber = Number(counts);
  return countNumber >= 10000
    ? `${Math.trunc(countNumber / 10000)} 萬`
    : `${countNumber}`;
};
