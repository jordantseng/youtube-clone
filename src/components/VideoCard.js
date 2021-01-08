import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';

import './VideoCard.css';

const VideoCard = ({ video, onToggleLikeButton }) => {
  const [isLiked, setIsLiked] = useState(false);
  const likedVideosFromStorage = localStorage.getItem('likes');

  useEffect(() => {
    if (likedVideosFromStorage) {
      JSON.parse(likedVideosFromStorage).forEach((likedVideo) => {
        if (likedVideo.id === video.id) {
          setIsLiked(true);
        }
      });
    }
  }, [likedVideosFromStorage, video.id]);

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

  const renderDuration = () => {
    const millis = moment.duration(video.contentDetails.duration)._milliseconds;
    let hours = Math.floor(millis / 3600000);
    let minutes = Math.floor((millis - hours * 3600000) / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);

    return `${hours === 0 ? '' : hours + ':'}${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderViewcount =
    +video.statistics.viewCount > 10000
      ? `${Number.parseFloat(video.statistics.viewCount / 10000).toFixed(
          0
        )}萬次`
      : 'video.statistics.viewCount';

  const onLikeClick = () => {
    setIsLiked(!isLiked);
    onToggleLikeButton(video);
  };

  return (
    <>
      <div className='videoCard'>
        <div className='videoCard__thumbnail__container'>
          <Link to={`/${video.id}`} style={{ textDecoration: 'none' }}>
            <img
              src={video.snippet.thumbnails.medium.url}
              className='videoCard__thumbnail'
              height='170'
              width='200'
              alt=''
            />
          </Link>
        </div>
        <div className='videoCard__info__container'>
          <div className='videoCard__info'>
            <Avatar
              src={video.snippet.channel.thumbnails.default.url}
              className='videoCard__avatar'
              alt=''
            />
            <div className='videoCard__content'>
              <h4>{video.snippet.title}</h4>
              <p className='videoCard__channelTitle'>
                {video.snippet.channelTitle}
              </p>
              <p>
                觀看次數: {renderViewcount}．{renderDateDiff()}
              </p>
            </div>
          </div>
        </div>
        <div className='videoCard__duration'>{renderDuration()}</div>
        <div>
          {isLiked ? (
            <FavoriteIcon
              className='videoCard__like'
              onClick={() => onLikeClick()}
            />
          ) : (
            <FavoriteBorderIcon
              className='videoCard__like'
              onClick={() => onLikeClick()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VideoCard;
