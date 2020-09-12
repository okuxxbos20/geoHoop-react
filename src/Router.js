import React from 'react'
import { Switch, Route } from 'react-router'
import { Admin, Court, Index, Prefecture, Profile, Dashboard } from './pages'

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/admin'} component={Admin} />
      <Route exact path={'/court'} component={Court} />
      <Route exact path={'(/)?'} component={Index} />
      <Route exact path={'/prefecture'} component={Prefecture} />
      <Route exact path={'/profile'} component={Profile} />
      <Route exact path={'/admin/dashboard'} component={Dashboard} />
    </Switch>
  )
}

export default Router