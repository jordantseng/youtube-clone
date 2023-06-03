import { transformViews, transformTimeStamp } from '@/lib/util';

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
