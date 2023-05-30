import { useState, useEffect, useRef } from 'react';
// import { getPopularVideos } from '@/services/youtubeService';

import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
  },
});

const getVideos = async (params) => {
  const { data } = await youtubeApi.get('/videos', {
    params,
  });
  return data;
};

const getChannels = async (params) => {
  const { data } = await youtubeApi.get('/channels', {
    params,
  });
  return data;
};

export const getPopularVideos = async (pageToken) => {
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

const useFetchPopularVideos = (pageNumber: number) => {
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
          pageNumber > 1 ? [...preVideos, ...data] : [...data]
        );
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }

      setLoading(false);
    };

    fetchVideos();
  }, [pageNumber]);

  return {
    loading,
    videos,
    error,
    hasMore,
  };
};

export default useFetchPopularVideos;
