import { useState, useEffect, useRef } from 'react';

import { getSearchVideos, getVideos } from '@/services/youtube';
import { removeDuplicates } from '@/lib/util';

type RecommendVideo = {
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
      medium: { url: string; width: number; height: number };
    };
    title: string;
  };
};

const getRecommendVideos = async (pageToken: string) => {
  const searchVideosResponse = await getSearchVideos({
    part: 'snippet',
    maxResults: 25,
    type: 'video',
    pageToken,
  });

  const searchVideos = searchVideosResponse.items;

  const videoIds = searchVideos.map(({ id: { videoId } }) => videoId).join();

  const videosResponse = await getVideos({
    part: 'contentDetails,statistics',
    id: videoIds,
  });

  const videos = videosResponse.items;

  const newVideos = videos.map((video) => {
    const recommendVideoData = searchVideos.find(
      ({ id }) => id.videoId === video.id
    );

    return {
      ...recommendVideoData!,
      contentDetails: video.contentDetails,
      statistics: video.statistics,
    };
  });

  return { data: newVideos, nextPageToken: searchVideosResponse.nextPageToken };
};

const useFetchRecommendVideos = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<RecommendVideo[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchRecommendVideos = async () => {
      try {
        const { data, nextPageToken } = await getRecommendVideos(
          nextPageTokenRef.current
        );

        if (nextPageToken) {
          nextPageTokenRef.current = nextPageToken;
          setHasMore(true);
        } else {
          nextPageTokenRef.current = '';
          setHasMore(false);
        }

        setVideos((prevVideos) =>
          removeDuplicates('id.videoId', [...prevVideos, ...data])
        );
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchRecommendVideos();
  }, [page]);

  return {
    loading,
    videos,
    error,
    hasMore,
  };
};

export default useFetchRecommendVideos;
