import { io } from 'socket.io-client';

// const ENDPOINT = 'http://localhost:8080';
const ENDPOINT = 'https://tictactoe-api-v1.herokuapp.com';

let instance: any = null;

interface SocketType {
  openConnect: any;
  getInstance: any;
}
const Socket: SocketType = {
  openConnect: () => {
    instance = io(ENDPOINT);
  },
  getInstance: () => instance
};

export default Socket;
