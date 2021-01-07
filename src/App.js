import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Container from './components/Container';
import Header from './components/Header';
import LikeList from './pages/LikeList';
import VideoDetails from './pages/VideoDetails';
import Home from './pages/Home';

const App = () => {
  const [popularVideos, setPopularVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const likedVideosFromStorage = localStorage.getItem('likes');

  const KEY = 'AIzaSyDRKPReqMT7ttRoIUZit8gwmtZVJmTXzMY';
  const url = 'https://www.googleapis.com/youtube/v3';

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchVideos = async () => {
      const { data: firstFiftyVideos } = await axios.get(`${url}/videos`, {
        params: {
          part: 'contentDetails,snippet,statistics',
          chart: 'mostPopular',
          maxResults: 50,
          key: KEY,
        },
        cancelToken: source.token,
      });

      const { data: lastFiftyVideos } = await axios.get(`${url}/videos`, {
        params: {
          part: 'contentDetails,snippet,statistics',
          chart: 'mostPopular',
          maxResults: 50,
          key: KEY,
          pageToken: firstFiftyVideos.nextPageToken,
        },
      });

      let totalVideos = [...firstFiftyVideos.items, ...lastFiftyVideos.items];

      for (let video of totalVideos) {
        const channelImg = await axios.get(`${url}/channels`, {
          params: {
            part: 'snippet',
            id: video.snippet.channelId,
            key: KEY,
          },
          cancelToken: source.token,
        });

        video.snippet.channel = channelImg.data.items[0].snippet;
      }

      setPopularVideos(totalVideos);
    };

    fetchVideos();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (likedVideosFromStorage) {
      setLikedVideos(JSON.parse(likedVideosFromStorage));
    }
  }, [likedVideosFromStorage]);

  const onToggleLikeButton = (video) => {
    if (likedVideosFromStorage) {
      const alreadyLiked = JSON.parse(likedVideosFromStorage).find(
        (like) => like.id === video.id
      );

      if (alreadyLiked) {
        const remainder = JSON.parse(likedVideosFromStorage).filter(
          (like) => like.id !== video.id
        );

        setLikedVideos(remainder);
        localStorage.setItem('likes', JSON.stringify([...remainder]));
      } else {
        const newVideos = [...JSON.parse(likedVideosFromStorage), video];
        setLikedVideos(newVideos);
        localStorage.setItem('likes', JSON.stringify(newVideos));
      }
    } else {
      setLikedVideos([video]);

      localStorage.setItem('likes', JSON.stringify([video]));
    }
  };

  return (
    <Container>
      <Header />
      <Switch>
        <Route
          path='/likelist'
          render={(props) => (
            <LikeList
              likedVideos={likedVideos}
              onToggleLikeButton={onToggleLikeButton}
              {...props}
            />
          )}
        />
        <Route
          path='/:id'
          render={(props) => (
            <VideoDetails
              videos={popularVideos}
              onToggleLikeButton={onToggleLikeButton}
              {...props}
            />
          )}
        />
        <Route
          path='/'
          render={(props) => (
            <Home
              videos={popularVideos}
              onToggleLikeButton={onToggleLikeButton}
              {...props}
            />
          )}
        />
      </Switch>
    </Container>
  );
};

export default App;
