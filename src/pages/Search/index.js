import React from 'react';

const Search = ({ videos }) => {
  return (
    <div>
      {videos.map((video, index) => (
        <pre key={index}>{JSON.stringify(video, null, 2)}</pre>
      ))}
    </div>
  );
};

export default Search;
