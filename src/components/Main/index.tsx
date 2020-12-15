import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { RootState } from '../../types/Reducer';
import { AddBoard } from './AddBoard';
import GameLists from './GameLists/GameLists';
import UsersStatus from './UserStatus';

const Main = () => {
  const ENDPOINT = 'https://tictactoe-api-v1.herokuapp.com';
  const TOKEN = localStorage.getItem('access_token');
  const user: any = useSelector((state: RootState) => state.user.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.emit('login', { token: TOKEN });

    socket.on('list', (listUsers: any) => {
      setUsers(listUsers);
    });
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault();
      return socket.emit('logout', { token: TOKEN });
    });

    return () => {
      socket.emit('logout', { token: TOKEN });
      socket.disconnect();
    };
  }, [TOKEN]);

  const data = ['1', '2', '3'];
  const handleSubmit = () => {
    console.log('Add new game');
  };
  return (
    <div className="flex w-full h-screen flex-row justify-between p-10">
      <div className="main-add">
        <AddBoard handleSubmit={handleSubmit} />
      </div>
      <div className="main-lists p-10">
        <GameLists data={data} />
      </div>
      <div className="main-users flex flex-col items-end p-10">
        <UsersStatus users={users} user={user} />
      </div>
    </div>
  );
};

export default Main;
