import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import moment from 'moment';

import VideoPlayer from '../components/VideoPlayer';
import Videos from '../components/Videos';
import Loader from '../components/Loader';
import Advertisement from '../components/Advertisement';
import './VideoDetails.css';

const VideoDetails = ({ videos, onToggleLikeButton, match }) => {
  const [adShowed, setAdShowed] = useState(false);
  const videoId = match.params.id;

  const video = videos.find((video) => video.id === videoId);

  const renderDateDiff = () => {
    let start = moment(video.snippet.publishedAt);
    let now = moment(new Date().toISOString());

    const hourDiff = now.diff(start, 'hour');

    if (hourDiff > 24) {
      return `${now.diff(start, 'day')}天前`;
    }

    if (hourDiff > 24 * 30) {
      return `${now.diff(start, 'month')}月前`;
    }

    if (hourDiff > 24 * 30 * 12) {
      return `${now.diff(start, 'year')}年前`;
    }

    return `${hourDiff}小時前`;
  };

  const onVideoPause = () => {
    if (adShowed) {
      return;
    }

    setAdShowed(!adShowed);
  };

  const onCloseAd = () => {
    setAdShowed(!adShowed);
  };

  return (
    <>
      {video ? (
        <div className='videoDetails__top'>
          <div>
            <VideoPlayer
              eventON={{
                pause: onVideoPause,
              }}
            />
          </div>
          <div className='videoDetails__bottom'>
            <div className='videoDetails__content__container'>
              <div className='videoDetails__content'>
                <h3>{video.snippet.title}</h3>
                <p>
                  觀看次數: {video.statistics.viewCount}次．
                  {renderDateDiff()}
                </p>
              </div>

              <div className='videoDetails__divided'></div>
              <div className='videoDetails__channelInfo'>
                <div>
                  <Avatar
                    src={video.snippet.channel.thumbnails.default.url}
                    className='videoDetails__avatar'
                    alt=''
                  />
                </div>
                <div>
                  <div>
                    <h4>{video.snippet.channel.title}</h4>
                  </div>
                  <div>{video.snippet.description}</div>
                </div>
              </div>
            </div>
            <div className='videoDetails__videoList'>
              <Videos
                videos={videos.slice(0, 5)}
                onToggleLikeButton={onToggleLikeButton}
              />
            </div>
          </div>
          {adShowed && <Advertisement onCloseAd={onCloseAd} />}
        </div>
      ) : (
        <div className='videoDetails__loader'>
          <Loader />
        </div>
      )}
    </>
  );
};

export default VideoDetails;
