'use client';
import { useEffect, useState } from 'react';

import useFetchPopularVideos from '@/hooks/api/useFetchPopularVideos';
import useOnScreen from '@/hooks/useOnScreen';
import CardSkeleton from '@/components/CardSkeleton';
import VideoCard from '@/components/VideoCard';
import Loader from '@/components/common/Loader';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { loading, videos, error, hasMore } = useFetchPopularVideos(page);
  const [lastVideo, setLastVideo] = useState<HTMLDivElement | null>(null);
  const visible = useOnScreen(lastVideo);

  useEffect(() => {
    if (!visible || !hasMore) {
      return;
    }

    setPage((page) => page + 1);
  }, [visible, hasMore]);

  const getLastVideo = (element: HTMLDivElement) => {
    setLastVideo(element);
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-1 p-6 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] md:p-4">
        {videos.map((video, index) => {
          const lastVideo = videos.length - 1 === index;

          return (
            <VideoCard
              key={video.videoId}
              videoId={video.videoId}
              videoThumbnail={video.videoThumbnail}
              channelThumbnail={video.channelThumbnail}
              title={video.title}
              videoDuration={video.videoDuration}
              channel={video.channel}
              viewCount={video.viewCount}
              videoTimeStamp={video.videoTimeStamp}
              {...(lastVideo && { getLastVideo })}
            />
          );
        })}
        {loading &&
          Array(16)
            .fill(null)
            .map((_, index) => <CardSkeleton key={index} />)}
      </div>
      {loading && videos.length !== 0 && <Loader />}
    </>
  );
};

export default HomePage;
