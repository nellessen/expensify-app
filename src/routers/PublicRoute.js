import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...props
}) => (
    <Route {...props} component={(props) => (
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to="/dashboard" />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PublicRoute);