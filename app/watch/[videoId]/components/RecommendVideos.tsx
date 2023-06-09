'use client';
import { useEffect, useState } from 'react';

import useFetchRecommendVideos from '@/hooks/api/useFetchRecommendVideos';
import useOnScreen from '@/hooks/useOnScreen';
import Loader from '@/components/Loader';
import RecommendVideoCard from '@/app/watch/[videoId]/components/RecommendVideoCard';

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

  return (
    <>
      <div className="hidden xl:block">
        {videos.map(({ id, snippet, contentDetails, statistics }, index) => {
          const lastVideo = videos.length - 1 === index;

          return (
            <RecommendVideoCard
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
        {loading && <Loader />}
      </div>
      <div className="block xl:hidden">
        {videos.map(({ id, snippet, contentDetails, statistics }) => (
          <RecommendVideoCard
            key={id.videoId}
            id={id.videoId}
            videoThumbnail={snippet.thumbnails.medium.url}
            title={snippet.title}
            duration={contentDetails.duration}
            channel={snippet.channelTitle}
            viewCount={statistics.viewCount}
            timeStamp={snippet.publishedAt}
          />
        ))}
        {loading && <Loader />}
        <button
          className="w-full border border-slate-300 rounded-3xl py-2 text-blue-700 font-medium text-sm hover:bg-blue-200 my-2"
          onClick={() => setPage(page + 1)}
        >
          顯示完整資訊
        </button>
      </div>
    </>
  );
};

export default RecommendVideos;
