import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BoardGame from './BoardGame/BoardGame';
import Guest from './Players/Guest';
import Host from './Players/Host';
import Socket from '../../socket/socket';

const Game: React.FC = () => {
  const socket: any = Socket.getInstance();
  const TOKEN = localStorage.getItem('access_token');
  const { id } = useParams<{ id: string }>();
  socket.emit('joinGame', { token: TOKEN, gameId: id });

  useEffect(() => {
    socket.on('guestJoined', (data: any) => {
      // host, guest info
      console.log(data);
    });
  }, [socket]);

  socket.on('newMessage', (data: any) => {
    console.log(data.message);
  });

  const sendNewMessage = () => {
    // send message to room
    socket.emit('sendMessage', { gameId: id, message: 'hello' });
  };
  return (
    <div className="flex flex-row p-10">
      <div style={{ flex: 0.2 }}>Pannel 1</div>
      <div style={{ flex: 0.8 }} className="flex flex-col justify-between">
        <BoardGame />
        <div className="flex flex-row justify-between items-center">
          <Host />

          <Guest />
        </div>
      </div>
      <div style={{ flex: 0.2 }}>Pannel 2</div>
      <Button onClick={() => sendNewMessage()}>New message</Button>
    </div>
  );
};

export default Game;
