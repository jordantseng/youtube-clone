import styled, { css } from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 1012px) {
    justify-content: space-between;

    ${({ likedVideos }) => {
      return (
        likedVideos &&
        likedVideos.length % 2 === 1 &&
        css`
          &::after {
            content: '';
            flex: auto;
            margin: 0 10px;
          }
        `
      );
    }}
  }

  @media only screen and (max-width: 629px) {
    justify-content: center;
    &::after {
      display: none;
    }
  }
`;

export default CardsContainer;
