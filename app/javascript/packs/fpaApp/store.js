import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import playerReducer from './reducers/playerReducer';
import leagueReducer from './reducers/leagueReducer';
import teamReducer from './reducers/teamReducer';
import statReducer from './reducers/statReducer';


const reducers = combineReducers({
  playerReducer,
  leagueReducer,
  teamReducer,
  statReducer
});

const middleware = [thunk];

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);