import { Button } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { logout } from '../../redux/reducers/userReducer';
import { RootState } from '../../types/Reducer';
import Header from '../common/Header';
import UsersStatus from './UserStatus/UsersStatus';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const ENDPOINT = 'http://localhost:8080';

  const user: any = useSelector((state: RootState) => state.user.user);
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const profileHandler = () => {
    history.push('/dashboard/profile');
  };
  const redirectHomeHandler = () => {
    history.push('/dashboard');
  };

  const emitFunction = () => {
    const socket = io(ENDPOINT);
    socket.emit('message');
  };

  return (
    <div className="w-full">
      <Header
        redirectHomeHandler={redirectHomeHandler}
        name="Tik tac toe"
        username={user.fullName}
        logoutHandler={logoutHandler}
        profileHandler={profileHandler}
      />
      <div className="flex justify-center w-full">
        <UsersStatus />
        <Button onClick={() => emitFunction()}>Emmit</Button>
      </div>
    </div>
  );
};

export default Dashboard;
