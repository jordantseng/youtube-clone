import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const VideoBottom = styled.div`
  display: flex;

  @media only screen and (max-width: 769px) {
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

  @media only screen and (max-width: 769px) {
    .videoCard__container {
      width: 100% !important;
      display: flex !important;
    }

    .videoCard__thumbnail__container {
      flex: 1;
    }

    .videoCard__info__container {
      padding: 12px;
      margin: auto;
    }

    .videoCard__duration {
      bottom: 15px;
      right: 315px;
    }
  }
`;

export const ChannelInfo = styled.div`
  display: flex;
  padding: 18px;
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
