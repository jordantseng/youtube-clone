import styled from 'styled-components';

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px;

  @media only screen and (max-width: 1300px) {
    max-width: 1000px;
  }
`;

export default Container;
