import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080';
// const ENDPOINT = 'https://tictactoe-api-v1.herokuapp.com';

let instance: any = null;

interface SocketType {
  openConnect: any;
  getInstance: any;
  disconnect: any;
  login: any;
  logout: any;

  // Room
  createNewRoom: any;
  joinRoom: any;
  leaveRoom: any;
  pickPlayer: any;
  leaveChair: any;
  readyTrigger: any;
  sendMessage: any;

  subNewCreatedRoom: any; // when user create room
  subViewerTrigger: any; // when user join room or leave
  subPlayerPickChair: any; // when user pick one chair
  subPlayerLeaveChair: any; // when user leave one chair
  subPlayerStatusChange: any; // when user ready or not
  subListUser: any;
  subMessageToChat: any;

  // Match Game
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
  createNewRoom: (roomId: any, matchId: any) => {
    instance.emit('createNewRoom', { roomId, matchId });
  },
  joinRoom: (roomId: any) => {
    const token = getToken();
    instance.emit('joinRoom', { token, roomId });
  },
  leaveRoom: (roomId: any) => {
    const token = getToken();
    instance.emit('leaveRoom', { token, roomId });
  },
  pickPlayer: (roomId: any, chair: boolean) => {
    const token = getToken();
    instance.emit('pickPlayer', { token, roomId, chair });
  },
  leaveChair: (roomId: any) => {
    const token = getToken();
    instance.emit('leaveChair', { token, roomId });
  },
  readyTrigger: (roomId: any) => {
    const token = getToken();
    instance.emit('leaveChair', { token, roomId });
  },
  sendMessage: (roomId: any, msg: any) => {
    instance.emit('sendMessage', { gameId: roomId, newMessage: msg });
  },

  subViewerTrigger: (cb: any) => {
    instance.on('viewerTrigger', (data: any) => {
      return cb(null, data);
    });
  },
  subNewCreatedRoom: (cb: any) => {
    instance.on('newRoomCreated', (data: any) => {
      return cb(null, data);
    });
  },
  subPlayerPickChair: (cb: any) => {
    instance.on('playerPickChair', (data: any) => {
      return cb(null, data);
    });
  },
  subPlayerLeaveChair: (cb: any) => {
    instance.on('playerLeaveChair', (data: any) => {
      return cb(null, data);
    });
  },
  subPlayerStatusChange: (cb: any) => {
    instance.on('playerStatusChange', (data: any) => {
      return cb(null, data);
    });
  },

  subListUser: (cb: any) => {
    instance.on('list', (data: any) => {
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
