import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { logout } from '../../redux/reducers/userReducer';
import Socket from '../../socket/socket';
import { RootState } from '../../types/Reducer';
import PrivateRoute from '../auth/PrivateRoute';
import Header from '../common/Header';

const Game = React.lazy(() => import('../Game'));
const Main = React.lazy(() => import('../Main'));
const Profile = React.lazy(() => import('../Profile'));

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.user.user);
  const history = useHistory();
  const TOKEN = localStorage.getItem('access_token');
  Socket.openConnect();
  const socket = Socket.getInstance();
  const logoutHandler = () => {
    dispatch(logout());
    socket.emit('logout', { token: TOKEN });
  };
  const profileHandler = () => {
    history.push('/dashboard/profile');
  };
  const redirectHomeHandler = () => {
    history.push('/dashboard');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault();
      return socket.emit('logout', { token: TOKEN });
    });
  }, [TOKEN, socket]);
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
        <PrivateRoute path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default Dashboard;
