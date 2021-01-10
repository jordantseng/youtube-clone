import axios from 'axios';

const KEY = 'AIzaSyDDLNKxZbe_rgdm8eF_CjbOZaP-uDRee9Y';
// testing api key
// const KEY = 'AIzaSyBtjzfqXAZCBNQtA-sL0ctzOzZVUUzyORk';
export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: KEY,
  },
});
