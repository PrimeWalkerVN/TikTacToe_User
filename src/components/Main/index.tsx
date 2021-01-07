import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import gameApi from '../../api/gameApi';
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
  const user: any = useSelector((state: RootState) => state.user.user);
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    Socket.login();
    Socket.subListUser((err: any, data: any) => {
      if (err) return;
      setUsers(data.listUsers);
      if (data.listGames) setGames(data.listGames);
    });
    Socket.subNewCreatedGame((err: any, data: any) => {
      if (err) return;
      setGames(data);
    });
  }, []);

  const createNewGame = async (values: any) => {
    setIsLoading(true);
    const params = { host: user, ...values };
    try {
      const res: any = await gameApi.create(params);
      Socket.joinRoom(res.body.gameId.toString());
      Socket.subCreatedGame((err: any, data: any) => {
        if (err) return;
        history.push(`/dashboard/game/${data.gameId}`);
      });
    } catch (err) {
      if (err.response) Notification('error', 'Error', err.response.data.message);
      else Notification('error', 'Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values: any) => {
    createNewGame(values);
  };
  const handleJoinGame = async (item: any, password: any) => {
    const params = { gameId: item.gameId, password };
    setIsLoading(true);
    try {
      const res: any = await gameApi.joinGame(params);
      if (res) {
        history.push(`/dashboard/game/${item.gameId}`);
      }
    } catch (err) {
      if (err.response) Notification('error', 'Error', err.response.data.message);
      else Notification('error', 'Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex w-full h-screen flex-row justify-between p-10">
      {isLoading && <Loading />}
      <div className="main-add">
        <AddBoard handleSubmit={handleSubmit} />
      </div>
      <div className="main-lists p-10">
        <GameLists data={games} clickDetail={handleJoinGame} />
      </div>
      <div className="main-users flex flex-col items-end p-10">
        <UsersStatus users={users} user={user} />
      </div>
    </div>
  );
};

export default Main;
