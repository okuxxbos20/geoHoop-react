import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import Index from './pages/index/'
import Court from './pages/court/'
import Admin from './pages/admin/'
import Dashboard from './pages/admin/Dashboard'

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/court" component={Court} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
