import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import usersApi from './api/userApi';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import PrivateRouteAuth from './components/auth/PrivateRouteAuth';
import Register from './components/auth/Register';
import Loading from './components/common/Loading';
import NotFound from './components/common/Notfound';
import Notification from './components/common/Notification';
import { setLogged, setUser } from './redux/reducers/userReducer';

const Dashboard = React.lazy(() => import('./components/Dashboard'));

const history = createBrowserHistory();
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('access_token');
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    if (token) {
      const callMe = async () => {
        try {
          const user = await usersApi.getMe();
          if (user) {
            dispatch(setUser(user));
            dispatch(setLogged(true));
          }
        } catch (e) {
          Notification('error', 'Error', e.message);
        }
        setIsLoading(false);
      };
      callMe();
    }
  }, [token, dispatch]);

  return (
    <div className="container max-w-full">
      {isLoading ? (
        <Loading />
      ) : (
        <Router history={history}>
          <Switch>
            <PrivateRouteAuth path="/login" component={Login} />
            <PrivateRouteAuth path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Redirect exact from="/" to="/dashboard" />
            <Route component={NotFound} />
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
