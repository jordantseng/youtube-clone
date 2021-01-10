import { useEffect } from 'react';
import { useState } from 'react';

import youtube from '../apis/youtube';

const useFetchVideos = (numberOfVideos) => {
  const [videos, setVideos] = useState([]);

  // goal: get 100 videos including videoInfo and channelInfo
  // (1) fetch first 50 videos and get the nextPageToken
  // (2) fetch the rest 50 videos using the nextPageToken from (1)
  // (3) combine the results and fetch the channel info using each channelId
  const fetchChannelInfo = async (video) => {
    return await youtube.get('/channels', {
      params: {
        part: 'snippet',
        id: video.snippet.channelId,
      },
    });
  };

  useEffect(() => {
    const fetchVideos = async (pageToken = '') => {
      return await youtube.get('/videos', {
        params: {
          part: 'contentDetails,snippet,statistics',
          chart: 'mostPopular',
          maxResults: numberOfVideos / 2, // maximum: 50
          pageToken,
        },
      });
    };

    const fetchVideosWithChannelInfo = async () => {
      let results = [];
      let nextToken;

      do {
        const { data } = await fetchVideos(nextToken);
        nextToken = data.nextPageToken;
        results = [...results, ...data.items];

        if (results.length === numberOfVideos) {
          for (let video of results) {
            const channelInfo = await fetchChannelInfo(video);
            video.snippet.channel = channelInfo.data.items[0].snippet;
          }

          setVideos(results);
        }
      } while (nextToken && results.length < numberOfVideos);
    };

    fetchVideosWithChannelInfo();
  }, [numberOfVideos]);

  return [videos];
};

export default useFetchVideos;
