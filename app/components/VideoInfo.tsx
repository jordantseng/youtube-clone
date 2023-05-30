import dayjs from 'dayjs';

const transformTimeStamp = (timestamp: string) => {
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

const transformViews = (views: string) => {
  const viewCount = +views;

  if (viewCount >= 10000) {
    const truncatedCount = Math.trunc(viewCount / 10000);
    return `${truncatedCount} 萬次`;
  }

  return `${viewCount} 次`;
};

type VideoInfoProps = {
  title: string;
  channel: string;
  count: string;
  timeStamp: string;
};

const VideoInfo = ({ title, channel, count, timeStamp }: VideoInfoProps) => {
  const transformedViews = transformViews(count);
  const transformedTimeStamp = transformTimeStamp(timeStamp);
  const text = `觀看次數：${transformedViews} ・ ${transformedTimeStamp}`;

  return (
    <>
      <h4 className="w-full overflow-hidden line-clamp-2 whitespace-normal text-sm mb-1">
        {title}
      </h4>
      <p className="text-sm mb-1">{channel}</p>
      <p className="text-sm mb-1">{text}</p>
    </>
  );
};

export default VideoInfo;
