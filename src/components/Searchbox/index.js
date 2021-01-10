import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import history from '../../history';
import * as Styled from './styles';

const Searchbox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchClick = (e) => {
    e.preventDefault();
    onSearch(searchTerm);

    history.push('/search');
  };

  return (
    <Styled.Form onSubmit={onSearchClick}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type='text'
        placeholder='搜尋'
      />
      <button type='submit' className='searchboxIcon'>
        <SearchIcon fontSize='small' />
      </button>
    </Styled.Form>
  );
};

export default Searchbox;
