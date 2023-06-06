import { useRouter } from 'next/navigation';

import { transformViews, transformTimeStamp } from '@/lib/util';
import VideoThumbnail from './VideoThumbnail';

type Props = {
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
}: Props) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/watch/${id}`);
  };

  return (
    <div className="flex mb-2" ref={getLastVideo}>
      <VideoThumbnail
        thumbnail={videoThumbnail}
        duration={duration}
        onClick={handleImageClick}
      />
      <div className="flex flex-1 flex-col ml-2 cursor-pointer">
        <h4 className="overflow-hidden line-clamp-2 whitespace-normal text-sm font-medium mb-1">
          {title}
        </h4>
        <p className="overflow-hidden line-clamp-1 whitespace-normal text-xs text-slate-600 mb-1">{channel}</p>
        <p className="overflow-hidden line-clamp-1  whitespace-normal text-xs text-slate-600">
          觀看次數：{transformViews(viewCount)}・{transformTimeStamp(timeStamp)}
        </p>
      </div>
    </div>
  );
};

export default RecommendVideoCard;
