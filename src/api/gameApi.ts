import axiosClient from './axiosClient';

interface typeUserApi {
  create: any;
}

const usersApi: typeUserApi = {
  create: (params: any) => {
    const url = '/games/';
    return axiosClient.post(url, params);
  }
};

export default usersApi;
