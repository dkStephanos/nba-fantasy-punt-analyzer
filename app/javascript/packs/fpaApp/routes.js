import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Switch } from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';

import App from './components/app/App';
import LoginPage from './components/loginPage';
import LoginTransition from './components/loginTransition';

import PlayerFetchTransition from './containers/playerFetchTransition';
import LeagueSelect from './containers/leagueSelect';
import HomePage from './containers/homePage';

const Routes = (props) => (
	<Provider store={store} >  
	  <Router>
	    <App>
	    	<Switch>
	    		<Route path='/auth' component={LoginTransition} />
	    		<Route path='/leagueSelect' component={LeagueSelect} />
	    		<Route path='/fetchingPlayers' component={PlayerFetchTransition} />
	    		<Route path='/home/:playerStart' component={HomePage} />
	    		<Route exact path='/' component={LoginPage} />
	    	</Switch>
	    </App>
	  </Router>
	</Provider>
)

export default Routes;