import React, { useState, useEffect } from 'react';

import Container from './components/Container';
import Header from './components/Header';
import Routes from './components/Routes';
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
      <Routes
        likedVideos={likedVideos}
        searchedVideos={searchedVideos}
        popularVideos={popularVideos}
        onToggleLikeButton={onToggleLikeButton}
      />
    </Container>
  );
};

export default App;
