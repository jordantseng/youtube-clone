import axios from 'axios';

const KEY = 'AIzaSyCocKUct7Fl390TIwOiTR_8ZIhuWqULPVU';
// const KEY = 'AIzaSyBaUdWkOdqKoD_YleyZmjG2ndzWYys_GzQ-sL0ctzOzZVUUzyORk'; // backup key

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: KEY,
  },
});
