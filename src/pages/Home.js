import React, { useState } from 'react';

import Pagination from '../components/Pagination';

import CardLoader from '../components/CardLoader';
import Title from '../components/Title';
import VideoCard from '../components/VideoCard';
import CardsContainer from '../components/CardsContainer';
import PaginationContainer from '../components/PaginationContainer';

const Home = ({ history, location, videos, onToggleLikeButton }) => {
  const [videosPerPage] = useState(12);

  const currentPage = location.search.split('=')[1]
    ? +location.search.split('=')[1]
    : 1;

  const indexOfLastPost = currentPage * videosPerPage;
  const indexOfFirstPost = indexOfLastPost - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstPost, indexOfLastPost);

  const renderVideoCards = currentVideos.map((video) => (
    <VideoCard
      key={video.id}
      video={video}
      onToggleLikeButton={onToggleLikeButton}
    />
  ));

  return (
    <>
      {currentVideos.length ? (
        <>
          <Title>熱門影片</Title>
          <CardsContainer>{renderVideoCards}</CardsContainer>
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              videosPerPage={videosPerPage}
              totalVideos='100'
              history={history}
            />
          </PaginationContainer>
        </>
      ) : (
        <CardLoader />
      )}
    </>
  );
};

export default Home;
