'use client';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import useOnScreen from '@/app/hooks/useOnScreen';
import Loader from '@/app/components/Loader';
import RecommendVideoCard from '@/app/watch/[videoId]/RecommendVideoCard';
import { removeDuplicates } from '@/app/utils/helpers';
import { getRecommendVideos } from '@/app/services/youtube';

type Video = {
  data: {
    contentDetails: {
      duration: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
    };
    id: {
      videoId: string;
    };
    snippet: {
      channelId: string;
      channelTitle: string;
      description: string;
      publishTime: string;
      publishedAt: string;
      thumbnails: {
        medium: {
          url: string;
          width: number;
          height: number;
        };
      };
      title: string;
    };
  }[];
  nextPageToken: string;
};

const getKey = (pageIndex: number, previousPageData: Video) => {
  const url = `search?part=snippet&type=video&maxResults=25`;

  if (previousPageData && !previousPageData.nextPageToken) {
    return null;
  }

  if (pageIndex === 0) {
    return url;
  }

  return `${url}&pageToken=${previousPageData.nextPageToken}`;
};

const RecommendVideos = () => {
  const [lastVideo, setLastVideo] = useState<HTMLDivElement | null>(null);
  const visible = useOnScreen(lastVideo);

  const { data, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    getRecommendVideos
  );

  const videos = removeDuplicates(
    'id.videoId',
    data?.flatMap(({ data }) => data)
  );

  useEffect(() => {
    if (!visible) {
      return;
    }

    setSize((size) => size + 1);
  }, [visible, setSize]);

  const getLastVideo = (element: HTMLDivElement) => {
    setLastVideo(element);
  };

  return (
    <>
      <div className="hidden xl:block">
        {videos?.map(({ id, snippet, contentDetails, statistics }, index) => {
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
        {(isLoading || isValidating) && <Loader />}
      </div>
      <div className="block xl:hidden">
        {videos?.map(({ id, snippet, contentDetails, statistics }) => (
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
        {(isLoading || isValidating) && <Loader />}
        <button
          className="w-full border border-slate-300 rounded-3xl py-2 text-blue-700 font-medium text-sm hover:bg-blue-200 my-2"
          onClick={() => setSize((size) => size + 1)}
        >
          顯示完整資訊
        </button>
      </div>
    </>
  );
};

export default RecommendVideos;
