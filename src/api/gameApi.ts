import axiosClient from './axiosClient';

interface typeUserApi {
  create: any;
  joinGame: any;
}

const usersApi: typeUserApi = {
  create: (params: any) => {
    const url = '/games/';
    return axiosClient.post(url, params);
  },
  joinGame: (params: any) => {
    const url = `/games/join-game/${params.gameId}`;
    return axiosClient.post(url, params);
  }
};

export default usersApi;
