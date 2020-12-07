import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async config => {
  type header = {
    Authorization: string;
  };
  const customHeaders: header = { Authorization: '' };
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  }
  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers // but you can override for some requests
    }
  };
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  error => {
    throw error;
  }
);

export default axiosClient;
