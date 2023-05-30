import { useRouter } from 'next/navigation';

import VideoThumbnail from './VideoThumbnail';
import VideoInfo from './VideoInfo';
import Avatar from './Avatar';

type VideoCardProps = {
  videoId: string;
  title: string;
  viewCount: string;
  videoTimeStamp: string;
  videoDuration: string;
  videoThumbnail: string;
  channel: string;
  channelThumbnail: string;
  getLastVideo?: (element: HTMLDivElement) => void;
};

const VideoCard = ({
  videoId,
  title,
  viewCount,
  videoTimeStamp,
  videoDuration,
  videoThumbnail,
  channel,
  channelThumbnail,
  getLastVideo,
}: VideoCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/watch/${videoId}`);
  };

  return (
    <div className="cursor-pointer" ref={getLastVideo} onClick={handleClick}>
      <VideoThumbnail thumbnail={videoThumbnail} duration={videoDuration} />
      <div className="flex mt-2">
        <div className="flex items-center">
          <div className="mb-auto mt-2">
            <Avatar src={channelThumbnail} alt="Avatar" />
          </div>
          <div className="ml-4">
            <VideoInfo
              title={title}
              channel={channel}
              count={viewCount}
              timeStamp={videoTimeStamp}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
