import { useRouter } from 'next/navigation';

import { formatViews, formatTimeStamp } from '@/utils/helpers';
import VideoThumbnail from '../../../../components/VideoThumbnail';

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

  const handleNavigate = () => {
    router.push(`/watch/${id}`);
  };

  return (
    <div className="mb-2 flex" ref={getLastVideo}>
      <VideoThumbnail thumbnail={videoThumbnail} duration={duration} id={id}/>
      <div
        className="ml-2 flex flex-1 cursor-pointer flex-col"
        onClick={handleNavigate}
      >
        <h4 className="mb-1 line-clamp-2 overflow-hidden whitespace-normal text-sm font-medium">
          {title}
        </h4>
        <p className="mb-1 line-clamp-1 overflow-hidden whitespace-normal text-xs text-slate-600">
          {channel}
        </p>
        <p className="line-clamp-1 overflow-hidden  whitespace-normal text-xs text-slate-600">
          觀看次數：{formatViews(viewCount)}次・{formatTimeStamp(timeStamp)}
        </p>
      </div>
    </div>
  );
};

export default RecommendVideoCard;
