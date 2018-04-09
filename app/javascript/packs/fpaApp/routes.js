import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Switch } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/app/App';
import LoginPage from './components/loginPage';
import LoginTransition from './components/loginTransition';
import HomePage from './components/homePage';

const Routes = (props) => (
	<Provider>  
	  <Router>
	    <App>
	    	<Switch>
	    		<Route path='/auth' component={LoginTransition} />
	    		<Route path='/home' component={HomePage} />
	    		<Route exact path='/' component={LoginPage} />
	    	</Switch>
	    </App>
	  </Router>
	</Provider>
)

export default Routes;