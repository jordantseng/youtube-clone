import Image from 'next/image';
import Link from 'next/link';

import { formatDuration } from '@/app/utils/helpers';

type VideoThumbnailProps = {
  thumbnail: string;
  duration: string;
  id: string;
};

const VideoThumbnail = ({ thumbnail, duration, id }: VideoThumbnailProps) => {
  return (
    <>
      <Link href={`/watch/${id}`} className="relative aspect-video">
        <Image
          className="h-full w-full rounded-2xl object-cover"
          src={thumbnail}
          width={320}
          height={180}
          sizes=""
          alt=""
        />
        <div className="absolute bottom-2 right-2 rounded-md bg-secondary-dark p-1 text-xs font-medium text-secondary">
          {formatDuration(duration)}
        </div>
      </Link>
    </>
  );
};

export default VideoThumbnail;
