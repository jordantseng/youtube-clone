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

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
  },
});

export const getVideos = async (params: VideosParams) => {
  const { data } = await youtubeApi.get<VideosRes>('/videos', {
    params,
  });

  return data;
};

export const getChannels = async (params: ChannelsParams) => {
  const { data } = await youtubeApi.get<ChannelsRes>('/channels', {
    params,
  });

  return data;
};

export const getSearchVideos = async (params: SearchParams) => {
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
