'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import useOnScreen from '@/hooks/useOnScreen';
import SearchVideoCard from '@/app/search/components/SearchVideoCard';
import Loader from '@/components/Loader';
import { getSearchVideos, youtubeApiURL } from '@/services/youtube';
import useSWRInfinite from 'swr/infinite';
import { removeDuplicates } from '@/lib/util';

const getKey =
  (query: string) =>
  (
    pageIndex: number,
    previousPageData: {
      data: {
        contentDetails: {
          duration: string;
        };
        statistics: {
          viewCount: string;
          likeCount: string;
        };
        channelDetails: {
          title: string;
          thumbnails: {
            default: {
              url: string;
              width: number;
              height: number;
            };
            medium: {
              url: string;
              width: number;
              height: number;
            };
          };
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
    }
  ) => {
    const url = `${youtubeApiURL}/search?q=${query}&part=snippet&type=video&regionCode=TW&maxResults=25`;

    if (previousPageData && !previousPageData.nextPageToken) return null;

    if (pageIndex === 0) {
      return url;
    }

    return `${url}&pageToken=${previousPageData.nextPageToken}`;
  };

const SeachPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey(query),
    getSearchVideos
  );
  const [lastVideo, setLastVideo] = useState<HTMLDivElement | null>(null);
  const visible = useOnScreen(lastVideo);
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
    <main className="mt-4 mx-5">
      {videos?.map((video, index) => {
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
      {(isLoading || isValidating) && <Loader />}
    </main>
  );
};

export default SeachPage;
