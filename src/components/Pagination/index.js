import React from 'react';
import * as Styled from './styles';
import { Link } from 'react-router-dom';

const Pagination = ({ history, currentPage, videosPerPage, totalVideos }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
    pageNumbers.push(i);
  }

  const onChangePageClick = (number) => {
    if (number === 1 && currentPage === pageNumbers.length) {
      return;
    }

    if (number === -1 && currentPage === 1) {
      return;
    }

    history.push(`?page=${currentPage + number}`);
  };

  return (
    <>
      {pageNumbers.length > 1 && (
        <Styled.Pagination>
          <Styled.Arrow
            onClick={() => onChangePageClick(-1)}
            disabled={currentPage === 1}>
            &laquo;
          </Styled.Arrow>
          {pageNumbers.map((pageNumber) => (
            <Link to={`?page=${pageNumber}`} key={pageNumber}>
              <Styled.Page pagenumber={pageNumber} currentpage={currentPage}>
                {pageNumber}
              </Styled.Page>
            </Link>
          ))}
          <Styled.Arrow
            onClick={() => onChangePageClick(1)}
            disabled={currentPage === pageNumbers.length}>
            &raquo;
          </Styled.Arrow>
        </Styled.Pagination>
      )}
    </>
  );
};

export default Pagination;
