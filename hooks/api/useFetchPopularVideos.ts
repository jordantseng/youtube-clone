import { useState, useEffect, useRef } from 'react';
import { getPopularVideos } from '@/services/youtube';

type Video = {
  videoId: string;
  videoThumbnail: string;
  videoDuration: string;
  videoTimeStamp: string;
  title: string;
  viewCount: string;
  channelThumbnail: string;
  channel: string;
};

const useFetchPopularVideos = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);

      try {
        const { data, nextPageToken } = await getPopularVideos(
          nextPageTokenRef.current
        );

        if (nextPageToken) {
          nextPageTokenRef.current = nextPageToken;
          setHasMore(true);
        } else {
          nextPageTokenRef.current = '';
          setHasMore(false);
        }

        setVideos((preVideos) => [...preVideos, ...data]);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchVideos();
  }, [page]);

  return {
    loading,
    videos,
    error,
    hasMore,
  };
};

export default useFetchPopularVideos;
