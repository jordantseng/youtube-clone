import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Avatar } from '@material-ui/core';
import * as Styled from './styles';

const VideoCard = ({ video, onToggleLikeButton }) => {
  const [isLiked, setIsLiked] = useState(false);
  const likedVideosFromStorage = localStorage.getItem('likes');

  useEffect(() => {
    if (likedVideosFromStorage) {
      const isLikded = JSON.parse(likedVideosFromStorage).find(
        (likedVideo) => likedVideo.id === video.id
      );

      if (isLikded) {
        setIsLiked(true);
      }
    }
  }, [likedVideosFromStorage, video.id]);

  const renderDateDiff = () => {
    const start = moment(video.snippet.publishedAt);
    const now = moment(new Date().toISOString());

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
    const hours = Math.floor(millis / 3600000);
    const minutes = Math.floor((millis - hours * 3600000) / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    return `${hours === 0 ? '' : hours + ':'}${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderViewcount =
    +video.statistics.viewCount >= 10000
      ? `${Number.parseFloat(video.statistics.viewCount / 10000).toFixed(
          0
        )}萬次`
      : `${video.statistics.viewCount}次`;

  const renderLikeButton = isLiked ? (
    <Styled.LikeButton onClick={() => onLikeClick()} />
  ) : (
    <Styled.DisLikeButton onClick={() => onLikeClick()} />
  );

  const onLikeClick = () => {
    setIsLiked(!isLiked);
    onToggleLikeButton(video);
  };

  return (
    <Styled.VideoCardContainer className='videoCard__container'>
      <Styled.VideoCardThumbnailContainer className='videoCard__thumbnail__container'>
        <Styled.StyledLink to={`/videos/${video.id}`}>
          <Styled.VideoThumbnail
            src={video.snippet.thumbnails.medium.url}
            height='170'
            width='200'
            alt='videoThumbnail'
          />
        </Styled.StyledLink>
        <Styled.VideoDuration className='videoCard__duration'>
          {renderDuration()}
        </Styled.VideoDuration>
      </Styled.VideoCardThumbnailContainer>
      <div className='videoCard__info__container'>
        <Styled.VideoInfo className='videoCard__info'>
          <Avatar
            className='videoCard__channelThumbnail'
            src={video.snippet.channel.thumbnails.default.url}
            alt='channelThumbnail'
          />

          <Styled.VideoContent>
            <Styled.VideoTitle>{video.snippet.title}</Styled.VideoTitle>
            <Styled.ChannelTitle>
              {video.snippet.channelTitle}
            </Styled.ChannelTitle>
            <p>
              觀看次數: {renderViewcount}．{renderDateDiff()}
            </p>
          </Styled.VideoContent>
          {renderLikeButton}
        </Styled.VideoInfo>
      </div>
    </Styled.VideoCardContainer>
  );
};

export default VideoCard;
