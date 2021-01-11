import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { Button, Divider, List, Modal } from 'antd';
import CupIcon from '../../assets/images/players/icons8-world_cup.png';
import WinIcon from '../../assets/images/players/icons8-win.png';
import LoseIcon from '../../assets/images/players/icons8-squinting_face_with_tongue.png';
import Loading from '../common/Loading';
import matchApi from '../../api/matchApi';
import Notification from '../common/Notification';

const Profile = (props: any) => {
  const { location } = props;
  const [user, setUser] = useState<any>(null);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const { user } = location.state;
    if (user) {
      setUser(user);
      getMatches(user._id);
    }
  }, [location]);

  const getMatches = async (userId: any) => {
    setIsLoading(true);
    try {
      const res = await matchApi.getAllByUser({ userId });
      setMatches(res.body);
    } catch (err) {
      Notification('error', 'Error', "Can't get matches");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-screen bg-red-400 flex justify-center items-center">
      {isLoading && <Loading />}
      <div className="w-1/2 h-1/2 bg-white p-5">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-row justify-center items-center">
            <Avatar size={200} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div className="flex flex-col items-start">
              <div className="text-xl text-center">Username: {user && user.username}</div>
              <div className="text-xl text-center">FullName: {user && user.fullName}</div>
              <div className="text-xl text-center">Email:{user && user.email}</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-around m-10 w-full">
            <div className="flex flex-row items-center">
              <img className="h-10 w-10" src={CupIcon} alt="Logo" />
              <div className="mx-1 text-2xl">{user && user.cup}</div>
            </div>
            <div className="flex flex-row items-center">
              <img className="h-10 w-10" src={WinIcon} alt="Logo" />
              <div className="mx-1 text-2xl">{user && user.win}</div>
            </div>
            <div className="flex flex-row items-center">
              <img className="h-10 w-10" src={LoseIcon} alt="Logo" />
              <div className="mx-1 text-2xl">{user && user.lose}</div>
            </div>
            <div className="text-2xl font-bold">{user && user.winRatio}%</div>
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
          renderItem={(item: any, index: any) => (
            <List.Item>
              <div className="text-xl font-bold cursor-pointer">Match {index + 1}</div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default Profile;
