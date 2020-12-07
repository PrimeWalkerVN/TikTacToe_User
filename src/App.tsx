import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/common/Notfound';
import Dashboard from './components/Dashboard';

const history = createBrowserHistory();
const App: React.FC = () => {
  return (
    <div className="container max-w-full">
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect exact from="/" to="/dashboard" />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
