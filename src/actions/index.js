import axios from 'axios';

export const FETCH_POST = 'FETCH_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = 'sdvsdvs';

export function fetchPosts() {
  let request = axios.get(`${ROOT_URL}/posts?key=${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}