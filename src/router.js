import React from 'react'
import { Route, Switch, routerRedux } from 'dva/router'
import Authorized from './common/Authorized'
import routers from './common/router'
const { ConnectedRouter } = routerRedux

function RouterConfig({ history, app }) {
  const login = routers.find(v => v.path === '/login')
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={login.path} exact component={login.component().default}/>
        {
          routers && routers.map((v, i) => (
            v.path !== '/login' &&
            <Authorized
              key={i}
              exact
              {...v}
            />
          ))
        }
      </Switch>
    </ConnectedRouter>
  )
}

export default RouterConfig
