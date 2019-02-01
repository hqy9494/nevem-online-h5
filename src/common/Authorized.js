import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'dva/router'
import { connect } from 'dva'
import {getUrlParams} from '../utils/utils'

const isAuth = (rest) => {
  const { me } = rest

  let bol = true

  // 没登录
  if (!me) return false

  // 判断角色
  // if (me.role && me.role.name) {
  //   const name =  me.role.name
  //
  //   if (authority && !authority.includes(name)) bol = false
  // }
  return bol
}

/* eslint-disable react/prop-types */
const ProtectedRoute = ({component, failureRedirect, ...rest}) => {
  const authenticated = isAuth(rest)
  return (
    <Route {...rest} render={props => (
      authenticated ? (
        React.createElement(component().default, Object.assign(props, {
          name: rest.name,
          authority: rest.authority,
          params: getUrlParams()
        }))
      ) : (
        <Redirect to={{
          pathname: failureRedirect,
          state: {from: props.location}
        }}/>
      )
    )}/>
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
  failureRedirect: PropTypes.string
}

ProtectedRoute.defaultProps = {
  authenticate: false,
  failureRedirect: '/login'
}

const mapStateToProps = (state) => {
  const { account, me } = state

  return {
    authenticate: localStorage.token || account && account.token,
    me: localStorage.me ? JSON.parse(localStorage.me) : me
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
