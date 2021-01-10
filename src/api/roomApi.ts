import axiosClient from './axiosClient';

interface typeApi {
  create: any;
  joinRoom: any;
  getInfoRoom: any;
}

const roomApi: typeApi = {
  create: (params: any) => {
    const url = '/rooms/';
    return axiosClient.post(url, params);
  },
  joinRoom: (params: any) => {
    const url = `/rooms/join/${params.roomId}`;
    return axiosClient.post(url, params);
  },
  getInfoRoom: (params: any) => {
    const url = `/rooms/info/${params.roomId}`;
    return axiosClient.get(url);
  }
};

export default roomApi;
