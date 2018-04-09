import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import LoginPage from './components/loginPage';
import LoginTransition from './components/loginTransition';
import HomePage from './components/homePage';

const App = (props) => (
  <Router>
    <div>
      <Route exact path='/' component={LoginPage} />
      <Route exact path='/auth' component={LoginTransition} />
      <Route exact path='/home' component={HomePage} />
    </div>
  </Router>
)

export default App;