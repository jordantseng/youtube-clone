import React from 'react';
import Skeleton from 'react-loading-skeleton';
import * as Styled from './styles'


const CardLoader = ({ count = 12 }) => {
  return (
    <Styled.CardLoaderContainer>
      <Skeleton
        style={{ margin: '1rem 0 2rem 0' }}
        height='1.8rem'
        width={200}
      />
      <Styled.CardLoaderRow>
        {Array(count)
          .fill()
          .map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <Skeleton height={200} width={300} />
                </div>
                <div style={{ display: 'flex', padding: '12px' }}>
                  <Skeleton circle={true} height={50} width={50} />
                  <div style={{ marginLeft: '10px' }}>
                    <Skeleton height='1.8rem' width={225} />
                    <Skeleton
                      style={{ display: 'block', marginTop: '10px' }}
                      height='12px'
                      width={200}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </Styled.CardLoaderRow>
    </Styled.CardLoaderContainer>
  );
};

export default CardLoader;
