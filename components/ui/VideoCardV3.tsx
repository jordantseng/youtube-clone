import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Avatar from 'react-avatar';

import {
  transformDuration,
  transformViews,
  transformTimeStamp,
} from '@/lib/util';


type VideoCardV3Props = {
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

const VideoCardV3 = ({
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
}: VideoCardV3Props) => {
  const router = useRouter();

  const handleImageClick = (id: string) => {
    router.push(`/watch/${id}`);
  };

  return (
    <div className="flex flex-1 mb-4" ref={getLastVideo}>
      <div
        className={`relative mr-2 cursor-pointer h-28 w-44 lg:h-52 lg:w-96`}
        onClick={() => handleImageClick(id)}
      >
        <Image className="rounded-xl" fill alt="" src={videoThumbnail} />
        <div className="absolute bottom-2.5 right-2.5 p-1 bg-zinc-900 opacity-80 text-white text-xs rounded-md">
          {transformDuration(duration)}
        </div>
      </div>
      <div
        className="flex flex-1 flex-col cursor-pointer pl-2"
        onClick={() => handleImageClick(id)}
      >
        <h4 className="overflow-hidden line-clamp-2 whitespace-normal text-sm font-medium">
          {title}
        </h4>
        <div className="overflow-hidden line-clamp-1 whitespace-normal text-xs">
          觀看次數：{transformViews(viewCount)}・{transformTimeStamp(timeStamp)}
        </div>
        <div className="flex items-center py-2">
          <Avatar src={channelThumbnail} size="25" round />
          <p className="pl-2 overflow-hidden line-clamp-1 whitespace-normal text-xs">
            {channel}
          </p>
        </div>
        <p className="text-xs text-slate-600 overflow-hidden line-clamp-2 whitespace-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default VideoCardV3;
