import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
  },
});

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
      medium: { url: string; widt: number; height: number };
    };
  };
};

export const getVideos = async (params: {
  part: string;
  id?: string;
  chart?: string;
  regionCode?: string;
  maxResults?: number;
  pageToken?: string;
}) => {
  const { data } = await youtubeApi.get<{
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: RawVideo[];
    nextPageToken: string;
  }>('/videos', {
    params,
  });
  return data;
};

type RawChannel = {
  id: string;
  snippet: {
    title: string;
    thumbnails: { default: { url: string; widt: number; height: number } };
  };
  statistics: {
    subscriberCount: string;
  }
};

export const getChannels = async (params: { part: string; id: string }) => {
  const { data } = await youtubeApi.get<{
    items: RawChannel[];
  }>('/channels', {
    params,
  });
  return data;
};

type SearchParams = {
  part: string;
  type: string;
  pageToken?: string;
  maxResults?: number;
};

type RawSearchVideo = {
  id: { kind: string; videoId: string };
  snippet: {
    channelId: string;
    channelTitile: string;
    description: string;
    publishTime: string;
    pulishedAt: string;
    thumbnails: {
      default: { url: string; widt: number; height: number };
      high: { url: string; widt: number; height: number };
      medium: { url: string; widt: number; height: number };
    };
    title: string;
  };
};

export const getSearchVideos = async (params: SearchParams) => {
  const { data } = await youtubeApi.get<{
    nextPageToken: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: RawSearchVideo[];
    regionCode: string;
  }>('/search', {
    params,
  });
  return data;
};

export type RawComment = {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    canReply: boolean;
    isPublic: boolean;
    topLevelComment: {
      etage: string;
      id: string;
      kind: string;
      snippet: {
        authorChannelId: { value: string };
        authorChannelUrl: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
        canRate: boolean;
        likeCount: number;
        publishedAt: string;
        textDisplay: string;
        textOriginal: string;
        updatedAt: string;
        videoId: string;
        viewerRating: string;
      };
    };
    totalReplyCount: number;
    videoId: string;
  };
};

type CommentThreadParams = {
  part: string;
  videoId?: string;
  pageToken?: string;
  maxResults?: number;
};

export const getVideoComments = async (params: CommentThreadParams) => {
  const { data } = await youtubeApi.get<{
    nextPageToken: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: RawComment[];
  }>('/commentThreads', {
    params,
  });

  return data;
};
