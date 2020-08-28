import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Index from './pages/Index/'
import Court from './pages/Court/'

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/court" component={Court} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
