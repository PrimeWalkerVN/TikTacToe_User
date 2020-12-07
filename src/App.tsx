import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/common/Notfound';
import Dashboard from './components/Dashboard';
import Loading from './components/common/Loading';
import PrivateRouteAuth from './components/auth/PrivateRouteAuth';
import PrivateRoute from './components/auth/PrivateRoute';
import { RootState } from './types/Reducer';

const history = createBrowserHistory();
const App: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
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
