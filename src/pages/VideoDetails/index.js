import React, { useState } from 'react';
import moment from 'moment';

import VideoPlayer from '../../components/VideoPlayer';
import Loader from '../../components/Loader';
import Advertisement from '../../components/Advertisement';
import VideoCard from '../../components/VideoCard';
import Divider from '../../components/Divider';

import * as Styled from './styles';

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

  const renderVideoCards = videos
    .slice(0, 5)
    .map((video) => (
      <VideoCard
        key={video.id}
        video={video}
        onToggleLikeButton={onToggleLikeButton}
      />
    ));

  return (
    <>
      {video ? (
        <div className='videoDetails__top'>
          <div>
            <VideoPlayer onVideoPause={onVideoPause} />
          </div>
          <Styled.VideoBottom>
            <Styled.InfoContainer>
              <Styled.VideoInfo>
                <Styled.VideoTitle>{video.snippet.title}</Styled.VideoTitle>
                <p>
                  觀看次數: {video.statistics.viewCount}次．
                  {renderDateDiff()}
                </p>
              </Styled.VideoInfo>

              <Divider />
              <Styled.ChannelInfo>
                <div>
                  <Styled.ChannelImg
                    src={video.snippet.channel.thumbnails.default.url}
                    alt='channelThumbnail'
                  />
                </div>
                <div>
                  <div>
                    <h4>{video.snippet.channel.title}</h4>
                  </div>
                  <div>{video.snippet.description}</div>
                </div>
              </Styled.ChannelInfo>
            </Styled.InfoContainer>
            <Styled.VideoList>{renderVideoCards}</Styled.VideoList>
          </Styled.VideoBottom>
          {adShowed && <Advertisement onCloseAd={onCloseAd} />}
        </div>
      ) : (
        <Styled.LoaderContainer>
          <Loader />
        </Styled.LoaderContainer>
      )}
    </>
  );
};

export default VideoDetails;
