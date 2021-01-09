import axiosClient from './axiosClient';

interface typeApi {
  create: any;
  joinRoom: any;
}

const roomApi: typeApi = {
  create: (params: any) => {
    const url = '/rooms/';
    return axiosClient.post(url, params);
  },
  joinRoom: (params: any) => {
    const url = `/rooms/join/${params.roomId}`;
    return axiosClient.post(url, params);
  }
};

export default roomApi;
