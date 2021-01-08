import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import './Advertisement.css';

const Advertisement = ({ onCloseAd }) => {
  return (
    <div className='ad__container'>
      <CloseIcon className='ad__close' onClick={onCloseAd} />
    </div>
  );
};

export default Advertisement;
