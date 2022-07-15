import React from 'react';
import { Redirect, Route } from 'react-router';

function PrivateRoute({ children, ...props }) {
  const profile = false;
  console.log({ ...props });
  if (!profile) {
    return <Redirect to="/signin" />;
  }
  return <Route {...props}> {children} </Route>;
}

export default PrivateRoute;
