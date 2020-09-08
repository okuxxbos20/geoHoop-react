import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { Admin, Court, Index, Profile, Dashboard } from './pages'

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/court" component={Court} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/" component={Index} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
