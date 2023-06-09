import { useRouter } from 'next/navigation';
import Avatar from 'react-avatar';

import {
  transformViews,
  transformTimeStamp,
} from '@/lib/util';
import VideoThumbnail from '@/components/VideoThumbnail';

type Props = {
  id: string;
  videoThumbnail: string;
  title: string;
  duration: string;
  channel: string;
  viewCount: string;
  timeStamp: string;
  channelThumbnail: string;
  description: string;
  getLastVideo?: (element: HTMLDivElement) => void;
};

const SearchVideoCard = ({
  id,
  videoThumbnail,
  title,
  duration,
  channel,
  viewCount,
  timeStamp,
  channelThumbnail,
  description,
  getLastVideo,
}: Props) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/watch/${id}`);
  };

  return (
    <div className="flex mb-4" ref={getLastVideo}>
      <div className="flex-1 min-w-[150px]">
        <VideoThumbnail
          thumbnail={videoThumbnail}
          duration={duration}
          onClick={handleImageClick}
        />
      </div>
      <div
        className="flex-[3] ml-2 mt-0 break-all cursor-pointer"
        onClick={handleImageClick}
      >
        <h4 className="overflow-hidden line-clamp-1 whitespace-normal text-sm font-medium pb-1">
          {title}
        </h4>
        <p className="overflow-hidden line-clamp-1 whitespace-normal text-xs text-slate-600">
          觀看次數：{transformViews(viewCount)}・{transformTimeStamp(timeStamp)}
        </p>
        <div className="flex items-center py-2 gap-1">
          <Avatar src={channelThumbnail} size="25" round />
          <p className="overflow-hidden line-clamp-1 whitespace-normal text-xs">
            {channel}
          </p>
        </div>
        <p className="overflow-hidden line-clamp-1 whitespace-normal text-xs text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SearchVideoCard;
