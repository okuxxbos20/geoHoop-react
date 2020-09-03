import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import Admin from './pages/admin/'
import Court from './pages/court/'
import Dashboard from './pages/admin/Dashboard'
import Index from './pages/index/'
import Profile from './pages/profile/'

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
