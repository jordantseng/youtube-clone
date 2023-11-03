'use client';
import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

import useOnScreen from '@/hooks/useOnScreen';
import CardSkeleton from '@/components/CardSkeleton';
import PopularVideoCard from '@/app/components/PopularVideoCard';
import Loader from '@/components/Loader';
import { getPopularVideos } from '@/services/youtube';
import CategoryChips from '@/app/components/CategoryChips';
import { categories } from '@/app/data/categories';

type Video = {
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
};

const getKey = (pageIndex: number, previousPageData: Video) => {
  const url =
    'videos?part=contentDetails,snippet,statistics&chart=mostPopular&regionCode=TW&maxResults=25';

  if (previousPageData && !previousPageData.nextPageToken) {
    return null;
  }

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
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setSize((size) => size + 1);
  }, [visible, setSize]);

  const getLastVideo = (element: HTMLDivElement) => {
    setLastVideo(element);
  };

  const videos = data?.flatMap(({ data }) => data);

  return (
    <>
      <CategoryChips
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={(id) => setSelectedCategory(id)}
      />
      <div className="grid grid-cols-1 py-4 gap-4 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
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
