import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = 'sdvsdvs';

export function fetchPosts() {
    let request = axios.get(`${ROOT_URL}/posts?key=${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}
export function createPost(props) {
    let request = axios.post(`${ROOT_URL}/posts?key=${API_KEY}`, props);

    return {
        type: CREATE_POST,
        payload: request
    };
}
export function fetchPost(id) {
    let request = axios.get(`${ROOT_URL}/posts/${id}?key=${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}
export function deletePost(id) {
    let request = axios.delete(`${ROOT_URL}/posts/${id}?key=${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

