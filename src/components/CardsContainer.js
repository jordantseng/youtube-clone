import styled from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 1012px) {
    justify-content: center;
  }
`;

export default CardsContainer;
