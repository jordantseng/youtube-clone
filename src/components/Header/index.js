import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import youtubeLogo from '../../asset/1024px-YouTube_Logo_2017.png';
import Searchbox from '../Searchbox';
import * as Styled from './styles';

const Header = ({ onSearch }) => {
  return (
    <Styled.HeaderContainer>
      <Styled.StyledLink to='/home'>
        <img src={youtubeLogo} alt='youtubeLogo' />
      </Styled.StyledLink>
      <Searchbox onSearch={onSearch} />
      <Styled.HeaderIcons>
        <Styled.StyledNavLink to='/likelist' activeStyle={{ color: 'red' }}>
          <FavoriteBorderIcon />
        </Styled.StyledNavLink>
        <Styled.StyledNavLink to='/home' activeStyle={{ color: 'red' }} exact>
          <HomeIcon />
        </Styled.StyledNavLink>
      </Styled.HeaderIcons>
    </Styled.HeaderContainer>
  );
};

export default Header;
