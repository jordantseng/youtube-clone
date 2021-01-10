import React from 'react';
import * as Styled from './styles';

const Pagination = ({ history, currentPage, videosPerPage, totalVideos }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
    pageNumbers.push(i);
  }

  const onButtonClick = (number) => {
    if (number === 1 && currentPage === pageNumbers.length) {
      return;
    }

    if (number === -1 && currentPage === 1) {
      return;
    }

    history.push(`?page=${currentPage + number}`);
  };

  return (
    <Styled.Pagination>
      <Styled.Arrow
        onClick={() => onButtonClick(-1)}
        disabled={currentPage === 1}>
        &laquo;
      </Styled.Arrow>
      {pageNumbers.map((pageNumber) => (
        <Styled.Page
          to={`?page=${pageNumber}`}
          key={pageNumber}
          pagenumber={pageNumber}
          currentpage={currentPage}>
          {pageNumber}
        </Styled.Page>
      ))}
      <Styled.Arrow
        onClick={() => onButtonClick(1)}
        disabled={currentPage === pageNumbers.length}>
        &raquo;
      </Styled.Arrow>
    </Styled.Pagination>
  );
};

export default Pagination;
