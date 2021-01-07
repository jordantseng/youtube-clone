import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pagination from '../components/Pagination';
import Videos from '../components/Videos';
import './Home.css';

const Home = ({ location }) => {
  const [videos, setVideos] = useState([]);
  const [videosPerPage] = useState(12);
  const [nextPageToken, setNextPageToken] = useState('');

  const KEY = 'AIzaSyAZmaEedNnPe2BYpO5-G9aUvYm8QI-yZ5s';
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const url = 'https://www.googleapis.com/youtube/v3';

  const currentPage = location.search.split('=')[1]
    ? +location.search.split('=')[1]
    : 1;

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`${url}/videos`, {
        params: {
          part: 'contentDetails,snippet,statistics',
          chart: 'mostPopular',
          maxResults: 50,
          key: KEY,
          pageToken: nextPageToken ? nextPageToken : '',
        },
        cancelToken: source.token,
      });

      if (data.nextPageToken && !nextPageToken) {
        setNextPageToken(data.nextPageToken);
      }

      // for (let video of data.items) {
      //   const channelImg = await axios.get(`${url}/channels`, {
      //     params: {
      //       part: 'snippet',
      //       id: video.snippet.channelId,
      //       key: KEY,
      //     },
      //     cancelToken: source.token,
      //   });

      //   video.snippet.channel = channelImg.data.items[0].snippet;
      // }

      setVideos([...videos, ...data.items]);
    };

    fetchVideos();

    return () => {
      source.cancel();
    };
  }, [nextPageToken]);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = +currentPage * videosPerPage;
  const indexOfFirstPost = indexOfLastPost - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {videos.length ? (
        <div>
          <h2 className='home__title'>熱門影片</h2>
          <div className='home__popularVideos'>
            <Videos videos={currentVideos} />
          </div>
          <div className='home__pagination'>
            <Pagination
              currentPage={currentPage}
              videosPerPage={videosPerPage}
              totalVideos='100'

              // paginate={paginate}
            />
          </div>
        </div>
      ) : (
        'loading...'
      )}
    </>
  );
};

export default Home;
