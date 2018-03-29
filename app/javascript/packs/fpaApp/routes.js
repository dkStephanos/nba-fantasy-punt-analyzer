import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import LandingPage from './components/landingPage';
import AuthPage from './components/AuthPage';
const App = (props) => (
  <Router>
    <div>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/auth' component={AuthPage} />
    </div>
  </Router>
)
export default App;