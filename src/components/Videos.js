import React from 'react';

import VideoCard from './VideoCard';

const Videos = ({ videos, onToggleLikeButton }) => {
  const renderVideoCards = videos.map((video) => {
    return (
      <VideoCard
        key={video.id}
        video={video}
        onToggleLikeButton={onToggleLikeButton}
      />
    );
  });

  return <>{renderVideoCards}</>;
};

export default Videos;
