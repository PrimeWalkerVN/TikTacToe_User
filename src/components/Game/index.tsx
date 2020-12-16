import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Socket from '../../socket/socket';
import BoardGame from './BoardGame/BoardGame';
import Chat from './Chat/Chat';
import Guest from './Players/Guest';
import Host from './Players/Host';

const Game: React.FC = () => {
  const socket: any = Socket.getInstance();
  const TOKEN = localStorage.getItem('access_token');
  const { id } = useParams<{ id: string }>();
  socket.emit('joinGame', { token: TOKEN, gameId: id });
  useEffect(() => {
    socket.on('guestJoined', (data: any) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="flex flex-col p-10">
      <div className="flex flex-row">
        <div style={{ flex: 0.8 }} className="flex flex-col justify-between">
          <BoardGame />
          <div className="flex flex-row items-center my-10">
            <div style={{ flex: 0.2 }} className="flex flex-row justify-between">
              <button
                type="button"
                className=" w-32 h-24 inline-block px-6 py-2 text-2xl font-bold leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
              >
                Start
              </button>
              <button
                type="button"
                className="w-32 h-24 inline-block px-6 py-2 text-2xl font-bold leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
              >
                Leave
              </button>
            </div>
            <div className="flex flex-row justify-between items-center px-10" style={{ flex: 0.8 }}>
              <Host />
              <span>-</span>
              <Guest />
            </div>
          </div>
        </div>
        <div style={{ flex: 0.2 }}>
          <Chat roomId={id} />
        </div>
      </div>
    </div>
  );
};

export default Game;
