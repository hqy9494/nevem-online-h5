import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'dva/router'
import { connect } from 'dva'

/* eslint-disable react/prop-types */
const ProtectedRoute = ({component, authenticate, failureRedirect, ...rest}) => {
  const authenticated = Boolean(authenticate);
  return (
    <Route {...rest} render={props => (
      authenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: failureRedirect,
          state: {from: props.location}
        }}/>
      )
    )}/>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
  failureRedirect: PropTypes.string
};

ProtectedRoute.defaultProps = {
  authenticate: false,
  failureRedirect: '/login'
};

const mapStateToProps = (state) => {
  const { account } = state
  return {
    authenticate: localStorage.token || account && account.token
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
