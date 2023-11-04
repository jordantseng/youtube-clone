import { useRouter } from 'next/navigation';
import Avatar from 'react-avatar';

import VideoThumbnail from '@/app/components/VideoThumbnail';
import { formatViews, formatTimeStamp } from '@/app/utils/helpers';
import Link from 'next/link';

type PopularVideoCardProps = {
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
}: PopularVideoCardProps) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/watch/${id}`);
  };

  return (
    <div className="flex flex-col gap-2" ref={getLastVideo}>
      <VideoThumbnail thumbnail={videoThumbnail} duration={duration} id={id} />
      <div className="flex gap-2" onClick={handleNavigate}>
        <Link href={`/watch/${id}`} className="mb-auto mt-2">
          <Avatar src={channelThumbnail} alt="Avatar" size="40" round />
        </Link>
        <div className="flex flex-col">
          <Link
            className="mb-1 line-clamp-2 overflow-hidden whitespace-normal text-sm font-bold"
            href={`/watch/${id}`}
          >
            {title}
          </Link>
          <Link
            href={`/watch/${id}`}
            className="mb-1 line-clamp-1 overflow-hidden whitespace-normal text-xs text-light-text dark:text-dark-text"
          >
            {channel}
          </Link>
          <Link
            href={`/watch/${id}`}
            className="line-clamp-1 overflow-hidden whitespace-normal text-xs text-light-text dark:text-dark-text"
          >
            觀看次數：
            {`${formatViews(viewCount)}次 ・ ${formatTimeStamp(timeStamp)}`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularVideoCard;
