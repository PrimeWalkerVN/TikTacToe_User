import Avatar from 'antd/lib/avatar/avatar';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Divider, List, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CupIcon from '../../assets/images/players/icons8-world_cup.png';
import WinIcon from '../../assets/images/players/icons8-win.png';
import LoseIcon from '../../assets/images/players/icons8-squinting_face_with_tongue.png';
import Loading from '../common/Loading';
import matchApi from '../../api/matchApi';
import Notification from '../common/Notification';
import usersApi from '../../api/userApi';
import { setUser } from '../../redux/reducers/userReducer';

const Profile = (props: any) => {
  const { location } = props;
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<any>([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const getMe = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await usersApi.getMe();
      if (res) {
        dispatch(setUser(res.user));
      }
    } catch (err) {
      Notification('error', 'Error', "Can't get info");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);
  useEffect(() => {
    if (location) {
      const { user } = location.state;
      if (user) {
        getUserInfo(user._id);
        getMe();
        getMatches(user._id);
      }
    }
  }, [getMe, location]);

  const getUserInfo = async (userId: any) => {
    setIsLoading(true);
    try {
      const res = await usersApi.getUser({ userId });
      if (res) {
        setUserInfo(res.body);
      }
    } catch (err) {
      Notification('error', 'Error', "Can't get info");
    } finally {
      setIsLoading(false);
    }
  };

  const getMatches = async (userId: any) => {
    setIsLoading(true);
    try {
      const res = await matchApi.getAllByUser({ userId });
      setMatches(res.body.reverse());
    } catch (err) {
      Notification('error', 'Error', "Can't get matches");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetail = (item: any) => {
    if (item) history.push('/dashboard/match/detail', { item });
  };
  return (
    <div className="w-full h-screen bg-red-400 flex justify-center items-center">
      {isLoading && <Loading />}
      <div className="w-1/2 h-1/2 bg-white p-5">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-row justify-center items-center">
            <Avatar size={200} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div className="flex flex-col items-start">
              <div className="text-xl text-center">Username: {userInfo && userInfo.username}</div>
              <div className="text-xl text-center">FullName: {userInfo && userInfo.fullName}</div>
              <div className="text-xl text-center">Email:{userInfo && userInfo.email}</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-around m-10 w-full">
            <div className="flex flex-row items-center">
              <img className="h-10 w-10" src={CupIcon} alt="Logo" />
              <div className="mx-1 text-2xl">{userInfo && userInfo.cup}</div>
            </div>
            <div className="flex flex-row items-center">
              <img className="h-10 w-10" src={WinIcon} alt="Logo" />
              <div className="mx-1 text-2xl">{userInfo && userInfo.win}</div>
            </div>
            <div className="flex flex-row items-center">
              <img className="h-10 w-10" src={LoseIcon} alt="Logo" />
              <div className="mx-1 text-2xl">{userInfo && userInfo.lose}</div>
            </div>
            <div className="text-2xl font-bold">{userInfo && userInfo.winRatio}%</div>
          </div>
          <div className="flex flex-row items-center justify-around m-10 w-full">
            <Button onClick={() => setIsModal(true)} size="large" type="primary">
              History Match
            </Button>
          </div>
        </div>
      </div>
      <Modal visible={isModal} onCancel={() => setIsModal(false)}>
        <Divider orientation="left">History Match</Divider>
        <List
          header={<div>Newest</div>}
          bordered
          dataSource={matches}
          pagination={{ defaultPageSize: 8 }}
          renderItem={(item: any) => (
            <List.Item>
              <div onClick={() => handleDetail(item)} className="text-xl font-bold cursor-pointer">
                Match {matches.indexOf(item) + 1}
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default Profile;
