import { io } from 'socket.io-client';

const ENDPOINT = 'localhost:8080';
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
  startNewMatch: any;
  inviteUser: any;
  quickPlay: any;
  removeQuickPlay: any;

  subNewCreatedRoom: any; // when user create room
  subViewerTrigger: any; // when user join room or leave
  subPlayerPickChair: any; // when user pick one chair
  subPlayerStatusChange: any; // when user ready or not
  subListUser: any;
  subMessageToChat: any;
  subNewMatch: any;
  subHaveInvitation: any;
  offSubHaveInvitation: any;
  subHaveQuickPlay: any;

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
  quickPlay: (user: any) => {
    const token = getToken();
    if (token) instance.emit('quickPlay', { user });
  },
  removeQuickPlay: (user: any) => {
    const token = getToken();
    if (token) instance.emit('removeQuickPlay', { user });
    instance.off('haveQuickPlay');
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
  readyTrigger: (roomId: any, status: any) => {
    const token = getToken();
    instance.emit('readyTrigger', { token, roomId, status });
  },
  sendMessage: (roomId: any, msg: any) => {
    instance.emit('sendMessage', { roomId, newMessage: msg });
  },
  startNewMatch: (roomId: any) => {
    instance.emit('startNewMatch', { roomId });
  },
  inviteUser: (roomId: any, userInvite: any, userId: any) => {
    instance.emit('inviteUser', { roomId, userInvite, userId });
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
  subNewMatch: (cb: any) => {
    instance.on('newMatchCreated', (data: any) => {
      return cb(null, data);
    });
  },
  subHaveInvitation: (cb: any) => {
    instance.on('haveInvitation', (data: any) => {
      return cb(null, data);
    });
  },
  offSubHaveInvitation: async () => {
    await instance.off('haveInvitation');
  },
  subHaveQuickPlay: (cb: any) => {
    instance.on('haveQuickPlay', (data: any) => {
      return cb(null, data);
    });
  },

  // Game
  play: (roomId: any, position: any) => {
    if (!instance) return;
    instance.emit('play', { roomId, position });
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
