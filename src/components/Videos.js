import React from 'react';

import VideoCard from './VideoCard';

const Videos = ({ videos }) => {
  console.log(videos);

  const renderVideoCards = videos.map((video) => {
    return <VideoCard key={video.id} video={video} />;
  });

  return <>{renderVideoCards}</>;
};

export default Videos;
