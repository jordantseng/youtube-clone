import { useState } from 'react';

import youtube from '../apis/youtube';

const useFetchVideos = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const { data: firstFiftyVideos } = await youtube.get('/videos', {
      params: {
        part: 'contentDetails,snippet,statistics',
        chart: 'mostPopular',
        maxResults: 50,
      },
    });

    const { data: lastFiftyVideos } = await youtube.get('/videos', {
      params: {
        part: 'contentDetails,snippet,statistics',
        chart: 'mostPopular',
        maxResults: 50,
        pageToken: firstFiftyVideos.nextPageToken,
      },
    });

    let totalVideos = [...firstFiftyVideos.items, ...lastFiftyVideos.items];

    for (let video of totalVideos) {
      const channelImg = await youtube.get('/channels', {
        params: {
          part: 'snippet',
          id: video.snippet.channelId,
        },
      });

      video.snippet.channel = channelImg.data.items[0].snippet;
    }

    setVideos(totalVideos);
  };

  return [videos, fetchVideos];
};

export default useFetchVideos;
