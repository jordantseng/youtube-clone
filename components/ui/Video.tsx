'use client';

import VideoDetails from '@/components/ui/VideoDetails';
import VideoHeader from '@/components/ui/VideoHeader';

type VideoProps = {
  id: string;
  title: string;
  viewCount: string;
  videoTimeStamp: string;
  likeCount: string;
  channelThumbnail: { url: string; width: number; height: number };
  subscriberCount: string;
  channel: string;
  videoDescription: string;
};

const Video = ({
  id,
  title,
  viewCount,
  videoTimeStamp,
  likeCount,
  channelThumbnail,
  subscriberCount,
  channel,
  videoDescription,
}: VideoProps) => {
  return (
    <>
      <div className="relative aspect-video">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h3 className="mb-2 p-5 pl-0 pb-2 w-full border-b border-gray-300">
        {title}
      </h3>
      <div className="pt-5 px-0 pb-2 w-full">
        <VideoHeader
          channelThumbnail={channelThumbnail}
          channel={channel}
          subscriberCount={subscriberCount}
          likeCount={likeCount}
        />
        <VideoDetails
          viewCount={viewCount}
          videoTimeStamp={videoTimeStamp}
          videoDescription={videoDescription}
        />
      </div>
    </>
  );
};

export default Video;
