import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Container from './components/Container';
import Header from './components/Header';
import LikeList from './pages/LikeList';
import VideoDetails from './pages/VideoDetails';
import Search from './pages/Search';
import Home from './pages/Home';
import useSearch from './hooks/useSearch';
import useFetchVideos from './hooks/useFetchVideos';

const App = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [searchedVideos, search] = useSearch('');
  const [popularVideos] = useFetchVideos(100);
  const likedVideosFromStorage = localStorage.getItem('likes');

  useEffect(() => {
    if (likedVideosFromStorage) {
      setLikedVideos(JSON.parse(likedVideosFromStorage));
    }
  }, [likedVideosFromStorage]);

  const onSearch = (searchTerm) => {
    search(searchTerm);
  };

  const onToggleLikeButton = (video) => {
    if (likedVideos.length) {
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
      <Header onSearch={onSearch} />
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
          path='/search'
          render={() => (
            <Search
              videos={searchedVideos}
              onToggleLikeButton={onToggleLikeButton}
            />
          )}
        />
        <Route
          path='/videos/:id'
          render={(props) => (
            <VideoDetails
              videos={popularVideos}
              onToggleLikeButton={onToggleLikeButton}
              {...props}
            />
          )}
        />

        <Route
          path='/home'
          render={(props) => (
            <Home
              videos={popularVideos}
              onToggleLikeButton={onToggleLikeButton}
              {...props}
            />
          )}
        />
        <Redirect to='/home' />
      </Switch>
    </Container>
  );
};

export default App;
