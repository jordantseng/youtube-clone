import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';

import youtubeLogo from '../asset/1024px-YouTube_Logo_2017.png';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <Link to='/' className='header__logo'>
        <img src={youtubeLogo} alt='youtubeLogo' />
      </Link>
      <form className='header__searchbox'>
        <input type='text' placeholder='搜尋' />
        <button className='header__searchboxIcon'>
          <SearchIcon fontSize='small' />
        </button>
      </form>
      <div className='header__icons'>
        <NavLink to='/likelist' activeStyle={{ color: 'red' }}>
          <FavoriteBorderIcon className='header__icon' />
        </NavLink>
        <NavLink to='/' activeStyle={{ color: 'red' }} exact>
          <HomeIcon className='header__icon' />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
