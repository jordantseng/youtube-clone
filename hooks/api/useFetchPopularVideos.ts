import { useState, useEffect, useRef } from 'react';
import { getVideos, getChannels } from '@/services/youtube';

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

const getPopularVideos = async (pageToken: string) => {
  const videosResponse = await getVideos({
    part: 'contentDetails,snippet,statistics',
    chart: 'mostPopular',
    regionCode: 'TW',
    maxResults: 25,
    pageToken,
  });

  const videos = videosResponse.items;

  const channelIds = videos.map(({ snippet }) => snippet.channelId).join();

  const channelsResponse = await getChannels({
    part: 'snippet',
    id: channelIds,
  });

  const channels = channelsResponse.items;

  const data = videos.map((video) => {
    const channelDetails = channels.find(
      (channel) => video.snippet.channelId === channel.id
    );

    return {
      videoId: video.id,
      videoThumbnail: video.snippet.thumbnails.medium.url,
      videoDuration: video.contentDetails.duration,
      videoTimeStamp: video.snippet.publishedAt,
      title: video.snippet.title,
      viewCount: video.statistics.viewCount,
      channelThumbnail: channelDetails?.snippet.thumbnails.default.url ?? '',
      channel: channelDetails?.snippet.title ?? '',
    };
  });

  return { data, nextPageToken: videosResponse.nextPageToken };
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

        setVideos((preVideos) =>
          page > 1 ? [...preVideos, ...data] : [...data]
        );
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
