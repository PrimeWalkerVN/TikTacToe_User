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
      <div style={{ flex: 0.2 }}>History</div>
      <div style={{ flex: 0.8 }} className="flex flex-col justify-between">
        <BoardGame />
        <div className="flex flex-row justify-between items-center my-10">
          <Host />
          <span>-</span>
          <Guest />
        </div>
        <Button onClick={() => sendNewMessage()}>New message</Button>
      </div>
      <div style={{ flex: 0.2 }}>
        <Chat />
      </div>
    </div>
  );
};

export default Game;
