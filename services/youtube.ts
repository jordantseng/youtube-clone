import axios from 'axios';

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

type RawCommentThread = {
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

const youtubeApiBase = 'https://www.googleapis.com/youtube/v3';

const youtubeApi = axios.create({
  baseURL: youtubeApiBase,
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
  },
});

export const getCommentThreads = async (url: string) => {
  const {
    data: { items: commentThreads, nextPageToken },
  } = await youtubeApi.get<commentThreadsRes>(`${youtubeApiBase}/${url}`);

  const newCommentThreads = commentThreads.map(
    ({
      id,
      snippet: {
        canReply,
        topLevelComment: { snippet },
      },
    }) => ({
      id,
      authorImage: snippet.authorProfileImageUrl,
      authorName: snippet.authorDisplayName,
      publishedAt: snippet.publishedAt,
      content: snippet.textDisplay,
      likeCount: snippet.likeCount,
      canReply,
    })
  );

  return {
    data: newCommentThreads,
    nextPageToken,
  };
};

export const getPopularVideos = async (url: string) => {
  const {
    data: { items: videos, nextPageToken },
  } = await youtubeApi.get<VideosRes>(`${youtubeApiBase}/${url}`);

  const channelIds = videos.map(({ snippet }) => snippet.channelId).join();

  const { data: channelsResponse } = await youtubeApi.get<VideosRes>(
    `${youtubeApiBase}/channels?part=snippet&id=${channelIds}`
  );

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

  return { data, nextPageToken };
};

export const getSearchVideos = async (url: string) => {
  const {
    data: { items: searchVideos, nextPageToken },
  } = await youtubeApi.get<SearchVideosRes>(`${youtubeApiBase}/${url}`);

  const videoIds = searchVideos.map((video) => video.id.videoId).join();

  const channelIds = searchVideos
    .map((video) => video.snippet.channelId)
    .join();

  const {
    data: { items: videos },
  } = await youtubeApi.get<VideosRes>(
    `${youtubeApiBase}/videos?part=contentDetails,statistics&id=${videoIds}`
  );

  const {
    data: { items: channels },
  } = await youtubeApi.get<ChannelsRes>(
    `${youtubeApiBase}/channels?part=snippet&id=${channelIds}`
  );

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

  return { data: newVideos, nextPageToken };
};

export const getVideo = async (url: string) => {
  const { data } = await youtubeApi.get<VideosRes>(`${youtubeApiBase}/${url}`);

  const video = data.items[0];

  const {
    data: { items: channels },
  } = await youtubeApi.get<ChannelsRes>(
    `${youtubeApiBase}/channels?part=snippet,statistics&id=${video.snippet.channelId}`
  );

  const channel = channels[0];

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

export const getRecommendVideos = async (url: string) => {
  const { data: searchVideosResponse } = await youtubeApi.get<SearchVideosRes>(
    `${youtubeApiBase}/${url}`
  );

  const searchVideos = searchVideosResponse.items;

  const videoIds = searchVideos.map(({ id: { videoId } }) => videoId).join();

  const { data: videosResponse } = await youtubeApi.get<VideosRes>(
    `${youtubeApiBase}/videos?part=contentDetails,statistics&id=${videoIds}`
  );

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
