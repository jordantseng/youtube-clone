import Image from 'next/image';

import { transformDuration } from '@/lib/util';

type Props = {
  thumbnail: string;
  duration: string;
  onClick: () => void
};

// TODO: Image width and height
const VideoThumbnail = ({
  thumbnail,
  duration,
  onClick,
}: Props) => {
  return (
    <div className="relative cursor-pointer" onClick={() => onClick()}>
      <Image
        className="w-full rounded-2xl"
        src={thumbnail}
        width={320}
        height={180}
        alt=""
      />
      <div className="absolute bottom-2 right-2 p-1 bg-zinc-900/90 text-white text-xs font-medium rounded-md">
        {transformDuration(duration)}
      </div>
    </div>
  );
};

export default VideoThumbnail;
