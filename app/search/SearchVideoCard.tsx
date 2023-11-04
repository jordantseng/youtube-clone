import { useRouter } from 'next/navigation';
import Avatar from 'react-avatar';

import { formatViews, formatTimeStamp } from '@/app/utils/helpers';
import VideoThumbnail from '@/app/components/VideoThumbnail';
import Link from 'next/link';

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
        <VideoThumbnail
          thumbnail={videoThumbnail}
          duration={duration}
          id={id}
        />
      </div>
      <div className="ml-2 mt-0 flex-[3] break-all">
        <Link
          className="mb-1 line-clamp-1 overflow-hidden whitespace-normal text-sm font-medium"
          href={`/watch/${id}`}
        >
          {title}
        </Link>
        <Link
          className="line-clamp-1 overflow-hidden whitespace-normal text-xs text-light-text dark:text-dark-text"
          href={`/watch/${id}`}
        >
          觀看次數：{formatViews(viewCount)}次・{formatTimeStamp(timeStamp)}
        </Link>
        <Link href={`/watch/${id}`} className="flex items-center gap-1 my-2">
          <Avatar src={channelThumbnail} size="25" round />
          <p className="line-clamp-1 overflow-hidden whitespace-normal text-xs">
            {channel}
          </p>
        </Link>
        <Link
          href={`/watch/${id}`}
          className="line-clamp-1 overflow-hidden whitespace-normal text-xs text-light-text dark:text-dark-text"
        >
          {description}
        </Link>
      </div>
    </div>
  );
};

export default SearchVideoCard;
