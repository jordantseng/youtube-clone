import axios from 'axios';

type VideosParams = {
  part: string;
  id?: string;
  chart?: string;
  regionCode?: string;
  maxResults?: number;
  pageToken?: string;
};

type ChannelsParams = { part: string; id?: string };

type SearchParams = {
  part: string;
  q?: string;
  type?: string;
  pageToken?: string;
  maxResults?: number;
  eventType?: string;
  regionCode?: string;
};

type CommentThreadParams = {
  part: string;
  videoId?: string;
  pageToken?: string;
  maxResults?: number;
};

type RawVideo = {
  id: string;
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
  snippet: {
    channelId: string;
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string; width: number; height: number };
    };
  };
};

type RawChannel = {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
    };
  };
  statistics: {
    subscriberCount: string;
  };
};

type RawSearchVideo = {
  id: { videoId: string };
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

export type RawCommentThread = {
  id: string;
  snippet: {
    canReply: boolean;
    topLevelComment: {
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        likeCount: number;
        publishedAt: string;
        textDisplay: string;
      };
    };
  };
};

type VideosRes = {
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: RawVideo[];
  nextPageToken: string;
};

type ChannelsRes = {
  items: RawChannel[];
};

type SearchVideosRes = {
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: RawSearchVideo[];
  regionCode: string;
};

type commentThreadsRes = {
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: RawCommentThread[];
};

export const youtubeApiURL = 'https://www.googleapis.com/youtube/v3';

const youtubeApi = axios.create({
  baseURL: youtubeApiURL,
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
  },
});

const getVideos = async (params: VideosParams) => {
  const { data } = await youtubeApi.get<VideosRes>('/videos', {
    params,
  });

  return data;
};

const getChannels = async (params: ChannelsParams) => {
  const { data } = await youtubeApi.get<ChannelsRes>('/channels', {
    params,
  });

  return data;
};

const getSearchVideos = async (params: SearchParams) => {
  const { data } = await youtubeApi.get<SearchVideosRes>('/search', {
    params,
  });

  return data;
};

export const getCommentThreads = async (params: CommentThreadParams) => {
  const { data } = await youtubeApi.get<commentThreadsRes>('/commentThreads', {
    params,
  });

  return data;
};

export const getPopularVideos = async (url: string) => {
  const { data: videosResponse } = await youtubeApi.get<VideosRes>(url);

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

  return {
    data,
    nextPageToken: videosResponse.nextPageToken,
  };
};

export const getSearchResults = async (query: string, pageToken: string) => {
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
};

export const getVideo = async (videoId: string) => {
  const videos = await getVideos({
    part: 'snippet,contentDetails,statistics',
    id: videoId,
  });

  const video = videos.items[0];

  const channels = await getChannels({
    part: 'snippet,statistics',
    id: video.snippet.channelId,
  });

  const channel = channels.items[0];

  return {
    id: video.id,
    title: video.snippet.title,
    viewCount: video.statistics.viewCount,
    videoTimeStamp: video.snippet.publishedAt,
    likeCount: video.statistics.likeCount,
    channel: channel.snippet.title,
    subscriberCount: channel.statistics.subscriberCount,
    channelThumbnail: channel.snippet.thumbnails.default,
    videoDescription: video.snippet.description,
  };
};

export const getRecommendVideos = async (pageToken: string) => {
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
