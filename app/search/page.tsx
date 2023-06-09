'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import useFetchSearchVideos from '@/hooks/api/useFetchSearchVideos';
import useOnScreen from '@/hooks/useOnScreen';
import SearchVideoCard from '@/app/search/components/SearchVideoCard';
import Loader from '@/components/Loader';

const SeachPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(1);
  const { loading, videos, hasMore } = useFetchSearchVideos(page, query);
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
    <main className="mt-4 mx-5">
      {videos.map((video, index) => {
        const lastVideo = videos.length - 1 === index;

        return (
          <SearchVideoCard
            key={video.id.videoId}
            id={video.id.videoId}
            title={video.snippet.title}
            viewCount={video.statistics.viewCount}
            timeStamp={video.snippet.publishedAt}
            duration={video.contentDetails.duration}
            videoThumbnail={video.snippet.thumbnails.medium.url}
            channel={video.channelDetails.title}
            channelThumbnail={video.channelDetails.thumbnails.medium.url}
            description={video.snippet.description}
            {...(lastVideo && { getLastVideo })}
          />
        );
      })}
      {loading && <Loader />}
    </main>
  );
};

export default SeachPage;
