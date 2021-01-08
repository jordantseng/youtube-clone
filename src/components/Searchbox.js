import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import history from '../history';
import './Searchbox.css'

const Searchbox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchClick = (e) => {
    e.preventDefault();
    onSearch(searchTerm);

    history.push('/search');
  };

  return (
    <form className='searchbox' onSubmit={onSearchClick}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type='text'
        placeholder='搜尋'
      />
      <button type='submit' className='searchboxIcon'>
        <SearchIcon fontSize='small' />
      </button>
    </form>
  );
};

export default Searchbox;
