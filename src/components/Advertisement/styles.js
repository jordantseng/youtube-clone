import styled from 'styled-components';
import AdImg from '../../asset/w1200.jpeg';

export const AdContainer = styled.div`
  height: 200px;
  width: 250px;
  position: sticky;
  bottom: 10px;
  margin-left: auto;
  z-index: 999;
  background-color: red;
  background-image: url(${AdImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .closeIcon {
    position: absolute;
    right: 5px;
    cursor: pointer;
  }
`;
