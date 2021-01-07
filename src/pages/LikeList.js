import React from 'react';
import Videos from '../components/Videos';
import './LikeList.css';

const LikeList = ({ likedVideos, onToggleLikeButton }) => {
  return (
    <div>
      <h2 className='likelist__title'>收藏影片</h2>
      <div className='likelist__videos'>
        <Videos videos={likedVideos} onToggleLikeButton={onToggleLikeButton} />
      </div>
    </div>
  );
};

export default LikeList;
