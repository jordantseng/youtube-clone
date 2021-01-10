import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const VideoCardContainer = styled.div`
  width: 300px;
  position: relative;
  margin: 0 10px;
  margin-bottom: 40px;

  @media only screen and (max-width: 1012px) {
    flex: 1;
  }
`;

export const VideoCardThumbnailContainer = styled.div`
  position: relative;
`;

export const StyledLink = styled(Link)`
  textdecoration: none;
`;

export const VideoThumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const VideoInfo = styled.div`
  position: relative;
  display: flex;
  margin-top: 10px;
`;

export const VideoContent = styled.div`
  flex: 1;
  margin-left: 15px;

  p {
    font-size: 14px;
    color: gray;
  }
`;

export const VideoTitle = styled.h4`
  color: black;
  font-size: 14px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 230px;
`;

export const ChannelTitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 230px;
`;

export const VideoDuration = styled.div`
  position: absolute;
  background-color: black;
  color: #fff;
  right: 10px;
  bottom: 15px;
  padding: 2px 5px;
  opacity: 0.7;
`;

export const LikeButton = styled(FavoriteIcon)`
  position: absolute;
  cursor: pointer;
  bottom: 10px;
  right: 5px;
  color: red;
  z-index: 100;
`;

export const DisLikeButton = styled(FavoriteBorderIcon)`
  position: absolute;
  cursor: pointer;
  bottom: 10px;
  right: 5px;
  color: red;
  z-index: 100;
`;
