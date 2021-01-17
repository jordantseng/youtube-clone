import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LikeList from '../../pages/LikeList';
import Search from '../../pages/Search';
import VideoDetails from '../../pages/VideoDetails';
import Home from '../../pages/Home';

const Routes = ({
  likedVideos,
  searchedVideos,
  popularVideos,
  onToggleLikeButton,
}) => {
  return (
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
  );
};

export default Routes;
