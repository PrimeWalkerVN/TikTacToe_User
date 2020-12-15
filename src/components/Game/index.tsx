import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Socket from '../../socket/socket';

const Game = () => {
  const socket: any = Socket.getInstance();
  const TOKEN = localStorage.getItem('access_token');
  const { id } = useParams<{ id: string }>();
  socket.emit('joinGame', { token: TOKEN, gameId: id });

  useEffect(() => {
    socket.on('guestJoined', (data: any) => {
      // host, guest info
      console.log(data);
    });
  }, []);

  socket.on('newMessage', (data: any) => {
    console.log(data.message);
  });

  const sendNewMessage = () => {
    // send message to room
    socket.emit('sendMessage', { gameId: id, message: 'hello' });
  };

  return (
    <div>
      <Button onClick={() => sendNewMessage()}>New message</Button>
    </div>
  );
};

export default Game;
