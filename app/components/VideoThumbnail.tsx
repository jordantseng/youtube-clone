import Image from 'next/image';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

type VideoThumbnailProps = {
  thumbnail: string;
  duration: string;
};

const transformDuration = (duration: string) => {
  const totalSeconds = dayjs.duration(duration).asSeconds();
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.trunc(totalSeconds % 60);

  let transformedDuration = '';

  if (hours > 0) {
    transformedDuration += `${hours}:`;
  }

  transformedDuration += `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  return transformedDuration;
};

const VideoThumbnail = ({ thumbnail, duration }: VideoThumbnailProps) => {
  return (
    <div className="relative">
      <Image
        className="w-full rounded-2xl"
        src={thumbnail}
        width={320}
        height={176}
        alt=""
      />
      <div className="absolute bottom-2.5 right-2.5 p-1 bg-zinc-900 opacity-80 text-white text-xs rounded-md">
        {transformDuration(duration)}
      </div>
    </div>
  );
};

export default VideoThumbnail;
