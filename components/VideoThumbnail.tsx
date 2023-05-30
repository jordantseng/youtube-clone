import Image from 'next/image';

import { transformDuration } from '@/lib/util';

type VideoThumbnailProps = {
  thumbnail: string;
  duration: string;
};

const VideoThumbnail = ({ thumbnail, duration }: VideoThumbnailProps) => {
  return (
    <div className="relative">
      <Image
        className="w-full rounded-2xl"
        src={thumbnail}
        width={320}
        height={180}
        alt=""
      />
      <div className="absolute bottom-2.5 right-2.5 p-1 bg-zinc-900 opacity-80 text-white text-xs rounded-md">
        {transformDuration(duration)}
      </div>
    </div>
  );
};

export default VideoThumbnail;
