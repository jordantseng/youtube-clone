import React, { useState, useEffect } from 'react';
import Videos from '../components/Videos';
import './LikeList.css';

const LikeList = () => {
  const [likedVideos, setLikesVideos] = useState([]);
  const likedVideosFromStorage = localStorage.getItem('likes');

  useEffect(() => {
    if (likedVideosFromStorage) {
      setLikesVideos(JSON.parse(likedVideosFromStorage));
    }
  }, [likedVideosFromStorage]);

  return (
    <div>
      <h2 className='likelist__title'>收藏影片</h2>
      <div className='likelist__videos'>
        <Videos videos={likedVideos} />
      </div>
    </div>
  );
};

export default LikeList;
