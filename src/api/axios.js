import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import Cookies from 'js-cookie';

const baseURL = process.env.REACT_APP_API_BASE_URL;
//const baseURL = 'https://acoemicsgrcpwa-devbe.azurewebsites.net';
//const baseURL = 'http://localhost:1234';

const getToken = (name = 'token') => {
  return Cookies.get(name);
};

const Axios = axios.create({
  baseURL,
  //timeout: 80000,
});

Axios.interceptors.request.use(
  async (config) => {
    const storedTime = localStorage.getItem('lT');
    const fourHoursInMilliseconds = 4 * 60 * 60 * 1000; // 3 hrs 55 mins in milliseconds
    if (storedTime && Date.now() - storedTime >= fourHoursInMilliseconds) {
      Cookies.remove('token');
      localStorage.clear();
      window.location.reload();
    } else {
      const token = getToken('token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error),
);

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error && error.response && error.response.status === 403) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

export { Axios };
