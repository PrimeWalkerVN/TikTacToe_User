import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../types/Reducer';

import { PrivateRouteProps } from '../../types/Route';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const logged = useSelector((state: RootState) => state.user.logged);
  const user = useSelector((state: RootState) => state.user.user);
  const isUser = logged && user;
  return (
    <Route
      {...rest}
      render={props => {
        return isUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              search: `?next=${rest.location.pathname}`
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
