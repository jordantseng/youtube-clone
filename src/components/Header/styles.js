import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 998;
  background-color: #fff;
`;

export const StyledLink = styled(Link)`
  object-fit: contain;
  img {
    height: 20px;
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledNavLink = styled(NavLink)`
  color: black;
  svg {
    margin-right: 8px;
    cursor: pointer;
  }
`;
