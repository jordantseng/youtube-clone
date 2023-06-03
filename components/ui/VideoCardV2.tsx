import { useRouter } from 'next/navigation';
import Image from 'next/image';

import {
  transformDuration,
  transformViews,
  transformTimeStamp,
} from '@/lib/util';

type VideoCardV2Props = {
  id: string;
  videoThumbnail: string
  title: string;
  duration: string;
  channel: string;
  viewCount: string;
  timeStamp: string;
  getLastVideo?: (element: HTMLDivElement) => void;
}

const VideoCardV2 = ({
  id,
  videoThumbnail,
  title,
  duration,
  channel,
  viewCount,
  timeStamp,
  getLastVideo,
}: VideoCardV2Props) => {
  const router = useRouter();

  const handleImageClick = (id: string) => {
    router.push(`/watch/${id}`);
  };

  return (
    <div className="flex w-full mb-4" ref={getLastVideo}>
      <div
        className="relative h-24 w-40 mr-2 cursor-pointer"
        onClick={() => handleImageClick(id)}
      >
        <Image
          className="rounded-xl"
          height="300"
          width="300"
          alt=""
          src={videoThumbnail}
        />
        <div className="absolute bottom-2.5 right-2.5 p-1 bg-zinc-900 opacity-80 text-white text-xs rounded-md">
          {transformDuration(duration)}
        </div>
      </div>
      <div
        className="flex flex-1 flex-col cursor-pointer"
        onClick={() => handleImageClick(id)}
      >
        <h4 className="w-full overflow-hidden line-clamp-2 whitespace-normal text-sm font-medium mb-1">
          {title}
        </h4>
        <div className="w-full overflow-hidden line-clamp-1 whitespace-normal text-xs mb-1">
          {channel}
        </div>
        <div className="w-full overflow-hidden line-clamp-1 whitespace-normal text-xs mb-1">
          觀看次數：{transformViews(viewCount)}・{transformTimeStamp(timeStamp)}
        </div>
      </div>
    </div>
  );
};

export default VideoCardV2;
