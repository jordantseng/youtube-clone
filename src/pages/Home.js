import React, { useState } from 'react';

import Pagination from '../components/Pagination';
import Videos from '../components/Videos';
import CardLoader from '../components/CardLoader';
import './Home.css';

const Home = ({ history, location, videos, onToggleLikeButton }) => {
  const [videosPerPage] = useState(12);

  const currentPage = location.search.split('=')[1]
    ? +location.search.split('=')[1]
    : 1;

  const indexOfLastPost = +currentPage * videosPerPage;
  const indexOfFirstPost = indexOfLastPost - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {videos.length ? (
        <div>
          <h2 className='home__title'>熱門影片</h2>
          <div className='home__popularVideos'>
            <Videos
              videos={currentVideos}
              onToggleLikeButton={onToggleLikeButton}
            />
          </div>
          <div className='home__pagination'>
            <Pagination
              currentPage={currentPage}
              videosPerPage={videosPerPage}
              totalVideos='100'
              history={history}
            />
          </div>
        </div>
      ) : (
        <CardLoader />
      )}
    </>
  );
};

export default Home;
