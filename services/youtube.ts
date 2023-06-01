import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
  },
});

export const getVideos = async (params) => {
  const { data } = await youtubeApi.get('/videos', {
    params,
  });
  return data;
};

export const getChannels = async (params) => {
  const { data } = await youtubeApi.get('/channels', {
    params,
  });
  return data;
};

export const getSearchVideos = async (params) => {
  const { data } = await youtubeApi.get('/search', {
    params,
  });
  return data;
};
