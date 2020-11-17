import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Auth
import { useAuth } from 'services/auth';

export const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location, ...props }) => {
        if (rest.redirect) {
          return <Redirect to={{ pathname: '/login' }} />;
        }
        console.log(user);

        return user && user.token ? (
          location.pathname === '/' ? (
            <Redirect to="/app/dados-gerais" />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{ pathname: '/home', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};
