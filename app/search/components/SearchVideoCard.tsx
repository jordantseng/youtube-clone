import { useRouter } from 'next/navigation';
import Avatar from 'react-avatar';

import { formatViews, formatTimeStamp } from '@/utils/helpers';
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
    <div className="mb-4 flex" ref={getLastVideo}>
      <div className="min-w-[150px] flex-1">
        <VideoThumbnail thumbnail={videoThumbnail} duration={duration} id={id}/>
      </div>
      <div
        className="ml-2 mt-0 flex-[3] cursor-pointer break-all"
        onClick={handleImageClick}
      >
        <h4 className="line-clamp-1 overflow-hidden whitespace-normal pb-1 text-sm font-medium">
          {title}
        </h4>
        <p className="line-clamp-1 overflow-hidden whitespace-normal text-xs text-slate-600">
          觀看次數：{formatViews(viewCount)}次・{formatTimeStamp(timeStamp)}
        </p>
        <div className="flex items-center gap-1 py-2">
          <Avatar src={channelThumbnail} size="25" round />
          <p className="line-clamp-1 overflow-hidden whitespace-normal text-xs">
            {channel}
          </p>
        </div>
        <p className="line-clamp-1 overflow-hidden whitespace-normal text-xs text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SearchVideoCard;
