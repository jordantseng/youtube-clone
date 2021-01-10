import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import * as Styled from './styles';

const Advertisement = ({ onCloseAd }) => {
  return (
    <Styled.AdContainer>
      <CloseIcon className='closeIcon' onClick={onCloseAd} />
    </Styled.AdContainer>
  );
};

export default Advertisement;
