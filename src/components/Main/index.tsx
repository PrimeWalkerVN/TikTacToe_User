import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import matchApi from '../../api/matchApi';
import roomApi from '../../api/roomApi';
import usersApi from '../../api/userApi';
import { setRoomsAction, setUsersOnline } from '../../redux/reducers/roomReducer';
import Socket from '../../socket/socket';
import { RootState } from '../../types/Reducer';
import Loading from '../common/Loading';
import Notification from '../common/Notification';
import { AddBoard } from './AddBoard';
import LeaderBoard from './LeaderBoard';
import { QuickPlay } from './QuickPlay';
import RoomLists from './RoomLists/RoomLists';
import UsersStatus from './UserStatus';

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
  const [isModalInvite, setIsModalInvite] = useState(false);
  const [dataInvite, setDataInvite] = useState<any>(null);

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

  useEffect(() => {
    Socket.subHaveInvitation((err: any, data: any) => {
      if (err) return;
      if (data.userId === user._id) {
        if (data) {
          setDataInvite(data);
          setIsModalInvite(true);
        }
      }
    });
    return () => Socket.offSubHaveInvitation();
  }, [isModalInvite, user._id]);

  const createNewRoom = async (values: any) => {
    setIsLoading(true);
    const params = { creator: user, ...values };
    try {
      const res: any = await roomApi.create(params);
      const resMatch: any = await matchApi.create({ roomId: res.body.roomId });
      Socket.createNewRoom(res.body.roomId, resMatch.body._id);
      Socket.offSubHaveInvitation();
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
    Socket.quickPlay(user);
    Socket.subHaveQuickPlay((err: any, data: any) => {
      if (err) return;
      if (data?.user1?.username === user.username || data?.user2?.username === user.username) {
        if (data.roomId) {
          acceptInvitation(data.roomId);
        }
      }
    });
  };
  const handleRemoveQuickPlay = () => {
    Socket.removeQuickPlay(user);
  };
  const acceptInvitation = async (roomId: any) => {
    if (roomId) {
      const params = { roomId };
      setIsLoading(true);
      try {
        const res: any = await roomApi.joinRoomInvite(params);
        if (res) {
          history.push(`/dashboard/room/${roomId}`, { roomData: res.body });
        }
      } catch (err) {
        if (err.response) Notification('error', 'Error', err.response.data.message);
        else Notification('error', 'Error', err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const cancelInvitation = () => {
    setIsModalInvite(false);
    setDataInvite(null);
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
        <QuickPlay handleQuick={handleQuickPlay} handleRemoveQuick={handleRemoveQuickPlay} />
        <LeaderBoard data={ranks} />
      </div>
      <div className="main-lists">
        <RoomLists data={rooms} clickDetail={handleJoinRoom} />
      </div>
      <div className="main-users flex flex-col bg-scroll mx-5 ">
        <div className="text-bold text-xl my-5 flex items-center justify-center ">Users online</div>
        <UsersStatus users={users} user={user} />
      </div>
      <Modal
        visible={isModalInvite}
        onCancel={cancelInvitation}
        centered
        closable={false}
        onOk={() => acceptInvitation(dataInvite.roomId)}
      >
        <div className="mx-5 text-2xl font-bold text-center">
          {dataInvite?.userInvite?.username} invite you to solo!
        </div>
      </Modal>
    </div>
  );
};

export default Main;
