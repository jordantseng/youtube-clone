import { useRouter } from 'next/navigation';

import { transformViews, transformTimeStamp } from '@/lib/util';
import VideoThumbnail from './VideoThumbnail';

type VideoCardV2Props = {
  id: string;
  videoThumbnail: string;
  title: string;
  duration: string;
  channel: string;
  viewCount: string;
  timeStamp: string;
  getLastVideo?: (element: HTMLDivElement) => void;
};

const RecommendVideoCard = ({
  id,
  videoThumbnail,
  title,
  duration,
  channel,
  viewCount,
  timeStamp,
  getLastVideo,
}: VideoCardV2Props) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/watch/${id}`);
  };

  return (
    <div
      className="flex mb-2 cursor-pointer"
      ref={getLastVideo}
      onClick={() => handleClick(id)}
    >
      <VideoThumbnail thumbnail={videoThumbnail} duration={duration} />
      <div className="flex flex-1 flex-col ml-2">
        <h4 className="overflow-hidden line-clamp-2 text-sm font-medium mb-1">
          {title}
        </h4>
        <p className="overflow-hidden line-clamp-1 text-xs mb-1">{channel}</p>
        <p className="overflow-hidden line-clamp-1 text-xs">
          觀看次數：{transformViews(viewCount)}・{transformTimeStamp(timeStamp)}
        </p>
      </div>
    </div>
  );
};

export default RecommendVideoCard;
