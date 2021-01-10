import React from 'react';
import Title from '../../components/Title';

import VideoCard from '../../components/VideoCard';
import CardsContainer from '../../components/CardsContainer';

const LikeList = ({ likedVideos, onToggleLikeButton }) => {
  const renderVideoCards = likedVideos.map((likedVideo) => (
    <VideoCard
      key={likedVideo.id}
      video={likedVideo}
      onToggleLikeButton={onToggleLikeButton}
    />
  ));

  return (
    <>
      <Title>收藏影片</Title>
      <CardsContainer>{renderVideoCards}</CardsContainer>
    </>
  );
};

export default LikeList;
