import { useState, useRef, useEffect } from 'react';

import { getChannels, getSearchVideos, getVideos } from '@/services/youtube';
import { removeDuplicates } from '@/lib/util';

type Video = {
  id: { videoId: string };
  channelDetails: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
        height: number;
        width: number;
      };
    };
  };
  contentDetails: { duration: string };
  snippet: {
    title: string;
    publishedAt: string;
    channelId: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
        height: number;
        width: number;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
};

async function getSearchVideoResults(query: string, pageToken: string) {
  const searchVideosResponse = await getSearchVideos({
    q: query,
    part: 'snippet',
    type: 'video',
    eventType: 'completed',
    regionCode: 'TW',
    maxResults: 25,
    pageToken,
  });

  const searchVideos = searchVideosResponse.items;

  const videoIds = searchVideos.map((video) => video.id.videoId).join();

  const channelIds = searchVideos
    .map((video) => video.snippet.channelId)
    .join();

  const { items: videos } = await getVideos({
    part: 'contentDetails,statistics',
    id: videoIds,
  });

  const { items: channels } = await getChannels({
    part: 'snippet',
    id: channelIds,
  });

  const newVideos = searchVideos.map((searchedVideo) => {
    const { contentDetails, statistics } = videos.find(
      (video) => searchedVideo.id.videoId === video.id
    )!;

    const { snippet: channelDetails } = channels.find(
      (channel) => searchedVideo.snippet.channelId === channel.id
    )!;

    return {
      ...searchedVideo,
      contentDetails,
      statistics,
      channelDetails,
    };
  });

  return { data: newVideos, nextPageToken: searchVideosResponse.nextPageToken };
}

const useFetchSearchVideos = (page: number, query: string) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    const fetchSearchVideos = async () => {
      setLoading(true);

      try {
        const { data, nextPageToken } = await getSearchVideoResults(
          query,
          nextPageTokenRef.current
        );

        if (nextPageToken) {
          nextPageTokenRef.current = nextPageToken;
          setHasMore(true);
        } else {
          nextPageTokenRef.current = '';
          setHasMore(false);
        }

        setVideos((preVideos) =>
          removeDuplicates('id.videoId', [...preVideos, ...data])
        );
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchSearchVideos();
  }, [page, query]);

  return {
    loading,
    videos,
    error,
    hasMore,
  };
};

export default useFetchSearchVideos;
