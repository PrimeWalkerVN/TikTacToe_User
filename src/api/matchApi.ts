import axiosClient from './axiosClient';

interface typeApi {
  create: any;
  getAllByUser: any;
}

const matchApi: typeApi = {
  create: (params: any) => {
    const url = '/matches/';
    return axiosClient.post(url, params);
  },
  getAllByUser: (params: any) => {
    const url = `/matches/user/${params.userId}`;
    return axiosClient.get(url);
  }
};

export default matchApi;
