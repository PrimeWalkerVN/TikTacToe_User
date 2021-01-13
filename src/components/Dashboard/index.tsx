import React, { useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { setRoomsAction } from '../../redux/reducers/roomReducer';
import { logout } from '../../redux/reducers/userReducer';
import Socket from '../../socket/socket';
import { RootState } from '../../types/Reducer';
import PrivateRoute from '../auth/PrivateRoute';
import Header from '../common/Header';

const Game = React.lazy(() => import('../Game'));
const Main = React.lazy(() => import('../Main'));
const Profile = React.lazy(() => import('../Profile'));
const HistoryMatch = React.lazy(() => import('../HistoryMatch'));

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
    history.push('/dashboard/profile', { user });
  };
  const redirectHomeHandler = () => {
    history.push('/dashboard');
  };
  useBeforeunload(async () => {
    await Socket.logout();
    await Socket.disconnect();
  });
  useEffect(() => {
    Socket.login();
  }, []);
  useEffect(() => {
    Socket.subNewCreatedRoom((err: any, data: any) => {
      if (err) return;
      dispatch(setRoomsAction(data));
    });
  }, [dispatch]);
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
        <PrivateRoute path="/dashboard/room/:id" component={Game} />
        <PrivateRoute path="/dashboard/profile" component={Profile} />
        <PrivateRoute path="/dashboard/match/detail" component={HistoryMatch} />
        <PrivateRoute path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default Dashboard;
