import Image from 'next/image';

import { transformDuration } from '@/lib/helpers';

type Props = {
  thumbnail: string;
  duration: string;
  onClick: () => void;
};

// TODO: srcset
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
        // loader
        sizes=""
        alt=""
      />
      <div className="absolute bottom-2 right-2 rounded-md bg-zinc-900/90 p-1 text-xs font-medium text-white">
        {transformDuration(duration)}
      </div>
    </div>
  );
};

export default VideoThumbnail;
