import { io } from 'socket.io-client';

// const ENDPOINT = 'http://localhost:8080';
const ENDPOINT = 'https://tictactoe-api-v1.herokuapp.com';

let instance: any = null;

interface SocketType {
  openConnect: any;
  getInstance: any;
  disconnect: any;
  login: any;
  logout: any;

  // Room
  joinRoom: any;
  joinGame: any;
  sendMessage: any;
  subNewCreatedGame: any;
  subCreatedGame: any;
  subListUser: any;
  subGuestJoined: any;
  subMessageToChat: any;

  // Game
  play: any;
  finishGame: any;
  subNewPlay: any;
  subGameFinished: any;
}
export const getToken = () => {
  const TOKEN = localStorage.getItem('access_token');
  return TOKEN;
};
const Socket: SocketType = {
  openConnect: () => {
    instance = io(ENDPOINT);
  },
  getInstance: () => instance,
  disconnect: () => {
    if (instance) instance.disconnect();
  },
  login: () => {
    const token = getToken();
    if (token) instance.emit('login', { token });
  },
  logout: () => {
    const token = getToken();
    if (token) instance.emit('logout', { token });
  },

  // Room
  joinRoom: (roomId: any) => {
    instance.emit('joinRoom', { gameId: roomId });
  },
  joinGame: (roomId: any) => {
    instance.emit('joinGame', { gameId: roomId });
  },
  sendMessage: (roomId: any, msg: any) => {
    instance.emit('sendMessage', { gameId: roomId, newMessage: msg });
  },
  subCreatedGame: (cb: any) => {
    instance.on('gameCreated', (data: any) => {
      return cb(null, data);
    });
  },
  subNewCreatedGame: (cb: any) => {
    instance.on('newGameCreated', (data: any) => {
      return cb(null, data);
    });
  },
  subListUser: (cb: any) => {
    instance.on('list', (data: any) => {
      return cb(null, data);
    });
  },
  subGuestJoined: (cb: any) => {
    instance.on('guestJoined', (data: any) => {
      return cb(null, data);
    });
  },
  subMessageToChat: (cb: any) => {
    instance.on('newMessage', (data: any) => {
      return cb(null, data);
    });
  },

  // Game
  play: (gameId: any, position: any) => {
    if (!instance) return;
    instance.emit('play', { gameId, position });
  },
  finishGame: (data: any) => {
    if (!instance) return;
    instance.emit('finishGame', data);
  },
  subNewPlay: (cb: any) => {
    instance.on('newPlay', (data: any) => {
      return cb(null, data);
    });
  },
  subGameFinished: (cb: any) => {
    instance.on('gameFinished', (data: any) => {
      return cb(null, data);
    });
  }
};

export default Socket;
