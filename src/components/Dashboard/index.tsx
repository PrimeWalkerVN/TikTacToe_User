import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { logout } from '../../redux/reducers/userReducer';
import { RootState } from '../../types/Reducer';
import PrivateRoute from '../auth/PrivateRoute';
import Header from '../common/Header';
import Game from '../Game';
import Main from '../Main';
import Profile from '../Profile';

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
    <div className="w-full">
      <Header
        redirectHomeHandler={redirectHomeHandler}
        name="Tik tac toe"
        username={user.fullName}
        logoutHandler={logoutHandler}
        profileHandler={profileHandler}
      />
      <Switch>
        <PrivateRoute path="/dashboard/game" component={Game} />
        <PrivateRoute path="/dashboard/profile" component={Profile} />
        <PrivateRoute path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default Dashboard;
