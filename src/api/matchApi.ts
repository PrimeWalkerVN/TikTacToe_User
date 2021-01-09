import axiosClient from './axiosClient';

interface typeApi {
  create: any;
}

const matchApi: typeApi = {
  create: (params: any) => {
    const url = '/matches/';
    return axiosClient.post(url, params);
  }
};

export default matchApi;
