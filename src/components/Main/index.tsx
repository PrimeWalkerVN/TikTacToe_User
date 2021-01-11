import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { setRoomsAction, setUsersOnline } from '../../redux/reducers/roomReducer';
import matchApi from '../../api/matchApi';
import { QuickPlay } from './QuickPlay';
import usersApi from '../../api/userApi';

const Main = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.user.user);
  const roomData: any = useSelector((state: RootState) => state.room.rooms);
  const usersOnline: any = useSelector((state: RootState) => state.room.usersOnline);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    setRooms(roomData);
    setUsers(usersOnline);
    Socket.subListUser((err: any, data: any) => {
      if (err) return;
      dispatch(setUsersOnline(data.listUsers));
      if (data.listRooms) {
        setRooms(data.listRooms);
        dispatch(setRoomsAction(data.listRooms));
      }
    });
  }, [dispatch, roomData, usersOnline]);

  const createNewRoom = async (values: any) => {
    setIsLoading(true);
    const params = { creator: user, ...values };
    try {
      const res: any = await roomApi.create(params);
      const resMatch: any = await matchApi.create({ roomId: res.body.roomId });
      Socket.createNewRoom(res.body.roomId, resMatch.body._id);
      history.push(`/dashboard/room/${res.body.roomId}`, {
        roomData: { roomInfo: { currentMatch: resMatch.body._id }, matches: [resMatch.body] }
      });
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
        history.push(`/dashboard/room/${item.roomId}`, { roomData: res.body });
      }
    } catch (err) {
      if (err.response) Notification('error', 'Error', err.response.data.message);
      else Notification('error', 'Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleQuickPlay = () => {
    console.log('Quick play');
  };

  useEffect(() => {
    setIsLoading(true);

    const getRanks = async () => {
      try {
        const res = await usersApi.getRanks();
        if (res) {
          setRanks(res.body);
        }
      } catch (e) {
        if (e.response) Notification('error', 'Error', e.response.data.message);
      } finally {
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    getRanks();
  }, []);
  return (
    <div className="flex w-full h-screen flex-row justify-between p-5 bg-scroll">
      {isLoading && <Loading />}
      <div className="main-add flex flex-col items-center shadow-xl mr-5 p-5">
        <AddBoard handleSubmit={handleSubmit} />
        <QuickPlay handleSubmit={handleQuickPlay} />
        <LeaderBoard data={ranks} />
      </div>
      <div className="main-lists">
        <RoomLists data={rooms} clickDetail={handleJoinRoom} />
      </div>
      <div className="main-users flex flex-col bg-scroll mx-5 ">
        <div className="text-bold text-xl my-5">Users online</div>
        <UsersStatus users={users} user={user} />
      </div>
    </div>
  );
};

export default Main;
