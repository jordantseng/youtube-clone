import { useState, useEffect, useRef } from 'react';
import { getVideos, getChannels } from '@/services/youtube';

const getPopularVideos = async (pageToken) => {
  const videos = await getVideos({
    part: 'contentDetails,snippet,statistics',
    chart: 'mostPopular',
    regionCode: 'TW',
    maxResults: 25,
    pageToken,
  });


  const channelIds = videos.items
    .map(({ snippet }) => snippet.channelId)
    .join();

  const channels = await getChannels({
    part: 'snippet',
    id: channelIds,
  });

  const data = videos.items
    .map((video) => {
      const channelDetails = channels.items.find(
        (channel) => video.snippet.channelId === channel.id
      );

      return { ...video, channelDetails };
    })
    .map(({ id, snippet, contentDetails, statistics, channelDetails }) => ({
      videoId: id,
      videoThumbnail: snippet.thumbnails.medium.url,
      videoDuration: contentDetails.duration,
      videoTimeStamp: snippet.publishedAt,
      title: snippet.title,
      viewCount: statistics.viewCount,
      channelThumbnail: channelDetails.snippet.thumbnails.default.url,
      channel: channelDetails.snippet.title,
    }));

  return { data, nextPageToken: videos.nextPageToken };
};

const useFetchPopularVideos = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
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
        console.log(error.message);
        setError(error.message);
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
