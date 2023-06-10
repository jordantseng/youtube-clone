import { useState, useRef, useEffect } from 'react';

import { getSearchResults } from '@/services/youtube';
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

const useFetchSearchResults = (page: number, query: string) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    const fetchSearchVideos = async () => {
      setLoading(true);

      try {
        const { data, nextPageToken } = await getSearchResults(
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

export default useFetchSearchResults;
