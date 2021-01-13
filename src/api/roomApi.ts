import axiosClient from './axiosClient';

interface typeApi {
  create: any;
  joinRoom: any;
  joinRoomInvite: any;
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
  },
  joinRoomInvite: (params: any) => {
    const url = `/rooms/join-invite/${params.roomId}`;
    return axiosClient.post(url, params);
  }
};

export default roomApi;
