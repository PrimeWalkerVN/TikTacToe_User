import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { logout } from '../../redux/reducers/userReducer';
import Socket from '../../socket/socket';
import { RootState } from '../../types/Reducer';
import PrivateRoute from '../auth/PrivateRoute';
import Header from '../common/Header';

const ProfileAnotherUser = React.lazy(() => import('../ProfileAnotherUser'));
const Game = React.lazy(() => import('../Game'));
const Main = React.lazy(() => import('../Main'));
const Profile = React.lazy(() => import('../Profile'));

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.user.user);
  const history = useHistory();
  Socket.openConnect();
  const logoutHandler = () => {
    Socket.logout();
    dispatch(logout());
  };
  const profileHandler = () => {
    history.push('/dashboard/profile');
  };
  const redirectHomeHandler = () => {
    history.push('/dashboard');
  };

  useEffect(() => {
    Socket.login();
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault();

      return () => {
        Socket.logout();
        Socket.disconnect();
      };
    });
  }, []);
  return (
    <div className="w-full">
      <Header
        redirectHomeHandler={redirectHomeHandler}
        name="Tik tac toe"
        username={user.fullName}
        logoutHandler={logoutHandler}
        profileHandler={profileHandler}
      />
      <Switch>
        <PrivateRoute path="/dashboard/game/:id" component={Game} />
        <PrivateRoute path="/dashboard/profile" component={Profile} />
        <PrivateRoute path="/dashboard/profile/:username" component={ProfileAnotherUser} />
        <PrivateRoute path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default Dashboard;
