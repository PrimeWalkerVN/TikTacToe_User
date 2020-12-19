import axiosClient from './axiosClient';

interface typeApi {
  create: any;
  joinGame: any;
}

const gameApi: typeApi = {
  create: (params: any) => {
    const url = '/games/';
    return axiosClient.post(url, params);
  },
  joinGame: (params: any) => {
    const url = `/games/join/${params.gameId}`;
    return axiosClient.post(url, params);
  }
};

export default gameApi;
