import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { RootState } from '../../types/Reducer';
import { AddBoard } from './AddBoard';
import GameLists from './GameLists/GameLists';
import UsersStatus from './UserStatus';
import Loading from '../common/Loading';
import gamesApi from '../../api/gameApi';

const Main = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ENDPOINT = 'http://localhost:8080';
  const TOKEN = localStorage.getItem('access_token');
  const user: any = useSelector((state: RootState) => state.user.user);
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const socket = io(ENDPOINT);

  useEffect(() => {
    socket.emit('login', { token: TOKEN });

    socket.on('list', (listUsers: any) => {
      setUsers(listUsers);
    });

    socket.on('newGameCreated', (data: any) => {
      setGames(data);
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

  const createNewGame = async () => {
    setIsLoading(true);
    const params = { token: TOKEN };
    try {
      const res: any = await gamesApi.create(params);
      socket.emit('joinRoom', { gameId: res.body.gameId.toString() });
      socket.on('gameCreated', (data: any) => {
        setIsLoading(false);
        history.push(`/dashboard/game/${data.gameId}`);
      });
    } catch (err) {
      // console.log(err);
      // if (err.response) setErrors(err.response.data.message.toString());
    }
  };

  const handleSubmit = () => {
    createNewGame();
  };
  return (
    <div className="flex w-full h-screen flex-row justify-between p-10">
      {isLoading && <Loading />}
      <div className="main-add">
        <AddBoard handleSubmit={handleSubmit} />
      </div>
      <div className="main-lists p-10">
        <GameLists data={games} />
      </div>
      <div className="main-users flex flex-col items-end p-10">
        <UsersStatus users={users} user={user} />
      </div>
    </div>
  );
};

export default Main;
