import Axios from 'axios';
import store from '../store';
import {
  TokenService
} from './TokenService';

//create axios instance
let instanceAxios = Axios.create({
  baseURL: 'http://iotdashboard.wg.ugm.ac.id'
});

//update token every request
instanceAxios.interceptors.request.use(
  config => {
    // get token from vuex
    const token = TokenService.getTokenVuex().access_token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

//if response 401 or 403, logout user
instanceAxios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401 || error.response.status === 403) {
    alert('FORBIDDEN');
    console.log('authentication failed, token has been changed locally');
    Promise.resolve(store.dispatch('removeAuth'));
  }
  throw error;
});

//specify endpoint API function
let endpoint = {

  getAllUser() {
    return instanceAxios.get('/api/users');
  },

  getDevice() {
    return instanceAxios.get('/api/devices');
  },

  getRole() {
    return instanceAxios.get('/api/roles');
  },

  getProfile() {
    return instanceAxios.get('/api/profile');
  },

  postUser(data) {
    return instanceAxios.post('/api/users', data);
  },

  login(data) {
    return instanceAxios.post('/oauth/token', data);
  },

  getField() {
    return instanceAxios.get('/api/fields');
  },

};

export default endpoint;
