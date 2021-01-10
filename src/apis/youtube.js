import axios from 'axios';

// const KEY = 'AIzaSyCocKUct7Fl390TIwOiTR_8ZIhuWqULPVU';
const KEY = 'AIzaSyBtjzfqXAZCBNQtA-sL0ctzOzZVUUzyORk';
export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: KEY,
  },
});
