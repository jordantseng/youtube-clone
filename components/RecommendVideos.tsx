'use client';
import { useEffect, useState } from 'react';

import useFetchRecommendVideos from '@/hooks/api/useFetchRecommendVideos';
import useOnScreen from '@/hooks/useOnScreen';
import Loader from '@/components/common/Loader';
import VideoCardV2 from '@/components/VideoCardV2';

const RecommendVideos = () => {
  const [page, setPage] = useState(1);
  const { loading, videos, hasMore } = useFetchRecommendVideos(page);
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

  if (loading && videos.length === 0) return null;
  
  return (
    <>
      {videos.map(({ id, snippet, contentDetails, statistics }, index) => {
        const lastVideo = videos.length - 1 === index;

        return (
          <VideoCardV2
            key={id.videoId}
            id={id.videoId}
            videoThumbnail={snippet.thumbnails.medium.url}
            title={snippet.title}
            duration={contentDetails.duration}
            channel={snippet.channelTitle}
            viewCount={statistics.viewCount}
            timeStamp={snippet.publishedAt}
            {...(lastVideo && { getLastVideo })}
          />
        );
      })}
      {loading && videos.length !== 0 && <Loader />}
    </>
  );
};

export default RecommendVideos;
