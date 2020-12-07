import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PrivateRouteProps } from '../../types/Route';
import { RootState } from '../../types/Reducer';

const PrivateRouteAuth: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const logged = useSelector((state: RootState) => state.user.logged);
  const user = useSelector((state: RootState) => state.user.user);
  const isUser = logged && user;
  return (
    <Route
      {...rest}
      render={props => {
        return !isUser ? <Component {...props} /> : <Redirect to="/dashboard" />;
      }}
    />
  );
};

export default PrivateRouteAuth;
