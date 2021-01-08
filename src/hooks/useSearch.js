import { useState, useEffect } from 'react';

import youtube from '../apis/youtube';

const useSearch = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async (term) => {
    if (!term) {
      return;
    }

    const { data } = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        type: 'video',
        maxResults: 12,
      },
    });

    setVideos(data.items);
  };

  return [videos, search];
};

export default useSearch;
