import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import usersApi from './api/userApi';
import ActiveEmail from './components/auth/ActiveEmail';
import ForgotPassword from './components/auth/ForgotPassword';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import PrivateRouteAuth from './components/auth/PrivateRouteAuth';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
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
          const res = await usersApi.getMe();
          if (res) {
            dispatch(setUser(res.user));
            dispatch(setLogged(true));
          }
        } catch (e) {
          Notification('error', 'Error', e.response.data.message);
        }
        setIsLoading(false);
      };
      callMe();
    } else setIsLoading(false);
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
            <Route path="/active-email" component={ActiveEmail} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <Redirect exact from="/" to="/dashboard" />
            <Route component={NotFound} />
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
