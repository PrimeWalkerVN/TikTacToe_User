import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import gamesApi from '../../api/gameApi';
import Socket from '../../socket/socket';
import { RootState } from '../../types/Reducer';
import Loading from '../common/Loading';
import Notification from '../common/Notification';
import { AddBoard } from './AddBoard';
import GameLists from './GameLists/GameLists';
import UsersStatus from './UserStatus';

const Main = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const TOKEN = localStorage.getItem('access_token');
  const user: any = useSelector((state: RootState) => state.user.user);
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const socket: any = Socket.getInstance();

  useEffect(() => {
    socket.emit('login', { token: TOKEN });

    socket.on('list', (data: any) => {
      setUsers(data.listUsers);
      if (data.listGames) setGames(data.listGames);
    });

    socket.on('newGameCreated', (data: any) => {
      setGames(data);
    });
  }, [TOKEN, socket]);

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
      if (err.response.data.message) {
        setIsLoading(false);
        Notification('error', 'Error', err.response.data.message);
      }
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
