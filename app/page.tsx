'use client';
import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

import useOnScreen from '@/hooks/useOnScreen';
import CardSkeleton from '@/components/CardSkeleton';
import PopularVideoCard from '@/app/components/PopularVideoCard';
import Loader from '@/components/Loader';
import { getPopularVideos, youtubeApiURL } from '@/services/youtube';

const getKey = (
  pageIndex: number,
  previousPageData: {
    data: {
      videoId: string;
      videoThumbnail: string;
      videoDuration: string;
      videoTimeStamp: string;
      title: string;
      viewCount: string;
      channelThumbnail: string;
      channel: string;
    }[];
    nextPageToken: string;
  }
) => {
  const url = `${youtubeApiURL}/videos?part=contentDetails,snippet,statistics&chart=mostPopular&regionCode=TW&maxResults=25`;
 
  // TODO: reached the end
  if (previousPageData && !previousPageData.data) return null;

  if (pageIndex === 0) {
    return url;
  }

  return `${url}&pageToken=${previousPageData.nextPageToken}`;
};

const HomePage = () => {
  const [lastVideo, setLastVideo] = useState<HTMLDivElement | null>(null);
  const visible = useOnScreen(lastVideo);
  const { data, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    getPopularVideos
  );
  const videos = data?.flatMap(({ data }) => data);

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
      <div className="grid gap-4 grid-cols-1 p-6 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] md:p-4">
        {videos?.map((video, index) => {
          const lastVideo = videos.length - 1 === index;

          return (
            <PopularVideoCard
              key={video.videoId}
              id={video.videoId}
              videoThumbnail={video.videoThumbnail}
              channelThumbnail={video.channelThumbnail}
              title={video.title}
              duration={video.videoDuration}
              channel={video.channel}
              viewCount={video.viewCount}
              timeStamp={video.videoTimeStamp}
              {...(lastVideo && { getLastVideo })}
            />
          );
        })}
        {(isLoading || isValidating) &&
          Array(16)
            .fill(null)
            .map((_, index) => <CardSkeleton key={index} />)}
      </div>
      {isValidating && videos?.length !== 0 && <Loader />}
    </>
  );
};

export default HomePage;
