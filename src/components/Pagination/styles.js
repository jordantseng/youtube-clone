import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Pagination = styled.div`
  display: inline-block;
`;

export const Arrow = styled.button`
  padding: 9.5px 16px;

  border: 1px solid #ddd;
  color: #0d6efd;
  cursor: pointer;

  &:disabled {
    background-color: lightgray;
    color: white;
    cursor: default;
  }

  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 5px;
    padding: 5px 10px;
  }
`;

export const Page = styled(Link)`
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
  color: #0d6efd;
  display: inline-block;

  &:hover {
    background-color: lightgray;
  }

  ${({ pagenumber, currentpage }) =>
    pagenumber === currentpage &&
    css`
      background-color: lightgray;
      border: 1px solid lightgray;
      color: white;
    `}

  @media only screen and (max-width: 480px) {
    font-size: 5px;
    padding: 5px 10px;
  }
`;
