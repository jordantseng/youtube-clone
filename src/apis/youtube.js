import axios from 'axios';

const KEY = 'AIzaSyBtjzfqXAZCBNQtA-sL0ctzOzZVUUzyORk';
export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: KEY,
  },
});
