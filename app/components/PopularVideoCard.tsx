import { useRouter } from 'next/navigation';
import Avatar from 'react-avatar';

import VideoThumbnail from '@/components/VideoThumbnail';
import { transformViews, transformTimeStamp } from '@/lib/util';

type Props = {
  id: string;
  title: string;
  viewCount: string;
  timeStamp: string;
  duration: string;
  videoThumbnail: string;
  channel: string;
  channelThumbnail: string;
  getLastVideo?: (element: HTMLDivElement) => void;
};

const PopularVideoCard = ({
  id,
  title,
  viewCount,
  timeStamp,
  duration,
  videoThumbnail,
  channel,
  channelThumbnail,
  getLastVideo,
}: Props) => {
  const router = useRouter();
  const transformedViews = transformViews(viewCount);
  const transformedTimeStamp = transformTimeStamp(timeStamp);

  const handleNavigate = () => {
    router.push(`/watch/${id}`);
  };

  return (
    <div ref={getLastVideo}>
      <VideoThumbnail
        thumbnail={videoThumbnail}
        duration={duration}
        onClick={handleNavigate}
      />
      <div className="flex mt-2 cursor-pointer" onClick={handleNavigate}>
        <div className="flex items-center">
          <div className="mb-auto mt-2">
            <Avatar src={channelThumbnail} alt="Avatar" size="40" round />
          </div>
          <div className="ml-4">
            <h4 className="overflow-hidden line-clamp-2 whitespace-normal text-sm font-medium mb-1">
              {title}
            </h4>
            <p className="overflow-hidden line-clamp-1 whitespace-normal text-xs mb-1">
              {channel}
            </p>
            <p className="overflow-hidden line-clamp-1 whitespace-normal text-xs">
              觀看次數：{`${transformedViews} ・ ${transformedTimeStamp}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularVideoCard;
