import { useRouter } from 'next/navigation';
import Avatar from 'react-avatar';

import VideoThumbnail from '@/components/ui/VideoThumbnail';
import VideoInfo from '@/components/ui/VideoInfo';

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

  const handleClick = () => {
    router.push(`/watch/${id}`);
  };

  return (
    <div className="cursor-pointer" ref={getLastVideo} onClick={handleClick}>
      <VideoThumbnail thumbnail={videoThumbnail} duration={duration} />
      <div className="flex mt-2">
        <div className="flex items-center">
          <div className="mb-auto mt-2">
            <Avatar src={channelThumbnail} alt="Avatar" size="40" round />
          </div>
          <div className="ml-4">
            <VideoInfo
              title={title}
              channel={channel}
              count={viewCount}
              timeStamp={timeStamp}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularVideoCard;
