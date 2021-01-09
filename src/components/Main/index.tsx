import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import roomApi from '../../api/roomApi';
import Socket from '../../socket/socket';
import { RootState } from '../../types/Reducer';
import Loading from '../common/Loading';
import Notification from '../common/Notification';
import { AddBoard } from './AddBoard';
import RoomLists from './RoomLists/RoomLists';
import LeaderBoard from './LeaderBoard';
import UsersStatus from './UserStatus';

const Main = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user: any = useSelector((state: RootState) => state.user.user);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    Socket.subListUser((err: any, data: any) => {
      if (err) return;
      setUsers(data.listUsers);
      if (data.listRooms) setRooms(data.listRooms);
    });
    Socket.subNewCreatedRoom((err: any, data: any) => {
      if (err) return;
      setRooms(data);
    });
  }, []);

  const createNewRoom = async (values: any) => {
    setIsLoading(true);
    const params = { creator: user, ...values };
    try {
      const res: any = await roomApi.create(params);
      Socket.createNewRoom(res.body.roomId.toString());
      history.push(`/dashboard/room/${res.roomId}`);
    } catch (err) {
      if (err.response) Notification('error', 'Error', err.response.data.message);
      else Notification('error', 'Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values: any) => {
    createNewRoom(values);
  };
  const handleJoinRoom = async (item: any, password: any) => {
    const params = { roomId: item.roomId, password };
    setIsLoading(true);
    try {
      const res: any = await roomApi.joinRoom(params);
      if (res) {
        history.push(`/dashboard/room/${item.roomId}`);
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
      <div className="main-add flex flex-col">
        <AddBoard handleSubmit={handleSubmit} />
        <LeaderBoard />
      </div>
      <div className="main-lists p-5">
        <RoomLists data={rooms} clickDetail={handleJoinRoom} />
      </div>
      <div className="main-users flex flex-col items-end p-5">
        <UsersStatus users={users} user={user} />
      </div>
    </div>
  );
};

export default Main;
