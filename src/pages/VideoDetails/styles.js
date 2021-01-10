import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const VideoBottom = styled.div`
  display: flex;

  @media only screen and (max-width: 992px) {
    display: block;
  }
`;

export const InfoContainer = styled.div`
  flex: 3;
`;

export const VideoInfo = styled.div`
  padding: 18px;
  margin-top: 12px;
`;

export const VideoTitle = styled.h3`
  margin-bottom: 12px;
`;

export const VideoList = styled.div`
  flex: 1;
  padding: 18px;
  margin-top: 12px;
  flex-wrap: wrap;

  @media only screen and (max-width: 992px) {
    .videoCard__container {
      width: 100%;
      display: flex;
    }

    .videoCard__thumbnail__container {
      flex: 1;
    }

    .videoCard__info__container {
      padding: 12px;
      margin: auto;
      flex: 1;
    }

    .videoCard__duration {
      bottom: 10px;
      right: 15px;
    }
  }

  @media only screen and (max-width: 576px) {
    .videoCard__container {
      margin: 0 0 3px 0;
    }

    .videoCard__thumbnail__container img {
      height: 45px;
      width: 80px;
    }

    .videoCard__info__container {
      padding: 0;
      flex: 5;

      .videoCard__info {
        margin: 0;

        h4 {
          font-size: 7px;
        }

        p {
          font-size: 6px;
        }
      }

      .videoCard__channelThumbnail {
        display: none;
      }
    }

    .videoCard__duration {
      font-size: 8px;
      right: 5px;
      bottom: 8px;
    }
  }
`;

export const ChannelInfo = styled.div`
  display: flex;
  padding: 18px;
  word-break: break-word;
  h4 {
    margin-bottom: 12px;
  }
`;

export const ChannelImg = styled(Avatar)`
  margin-right: 12px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;
