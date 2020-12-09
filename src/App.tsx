import React, { useEffect } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/common/Notfound';
import Loading from './components/common/Loading';
import PrivateRouteAuth from './components/auth/PrivateRouteAuth';
import PrivateRoute from './components/auth/PrivateRoute';
import { RootState } from './types/Reducer';
import { setIsLoading } from './redux/reducers/loadingReducer';
import usersApi from './api/userApi';
import Notification from './components/common/Notification';
import { setLogged, setUser } from './redux/reducers/userReducer';

const Dashboard = React.lazy(() => import('./components/Dashboard'));

const history = createBrowserHistory();
const App: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const token = localStorage.getItem('access_token');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLoading(true));
    if (token) {
      const callMe = async () => {
        try {
          const user = await usersApi.getMe();
          setIsLoading(true);
          if (user) {
            dispatch(setUser(user));
            dispatch(setLogged(true));
          }
        } catch (e) {
          Notification('error', 'Error', e.message);
        }
      };
      callMe();
    }
    dispatch(setIsLoading(false));
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
