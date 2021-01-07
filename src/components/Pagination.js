import React from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = ({ currentPage, videosPerPage, totalVideos, paginate }) => {
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

    paginate(currentPage + number);
  };

  return (
    <nav className='pagination'>
      <button onClick={() => onButtonClick(-1)} disabled={currentPage === 1}>
        &laquo;
      </button>
      {pageNumbers.map((number) => (
        <Link
          to={`?page=${number}`}
          key={number}
          // onClick={() => paginate(number)}

          className={number === currentPage ? 'active' : ''}>
          {number}
        </Link>
      ))}
      <button
        onClick={() => onButtonClick(1)}
        disabled={currentPage === pageNumbers.length}>
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
