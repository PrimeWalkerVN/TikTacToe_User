import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../redux/reducers/userReducer';
import { RootState } from '../../types/Reducer';
import Header from '../common/Header';
import UsersStatus from './UsersStatus';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

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
  return (
    <div>
      <Header
        redirectHomeHandler={redirectHomeHandler}
        name="Tik tac toe"
        username={user.fullName}
        logoutHandler={logoutHandler}
        profileHandler={profileHandler}
      />
      <UsersStatus />
    </div>
  );
};

export default Dashboard;
