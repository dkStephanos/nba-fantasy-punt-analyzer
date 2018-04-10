import { auth } from '../utils/init';

const YAHOO_API_URL = process.env.YAHOO_API_BASE_URL;
const RAILS_API_URL = process.env.RAILS_API_URL;
const gameId = process.env.GAME_ID;

// ** Action Creators **
const setLeague = league => {
  return {
    type: 'GET_LEAGUE_SUCCESS',
    league
  };
};

const setLeagues = leagues => {
  return {
    type: 'GET_LEAGUES_SUCCESS',
    leagues
  };
};

// ** Async Actions **
export const getLeagueByKey = leagueKey => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${YAHOO_API_URL}/leagues/${leagueKey}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
      .then(response => response.json())
      .then(league => dispatch(setLeague(league)))
      .catch(error => console.log(error));
  };
};

export const getLeagues = () => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${RAILS_API_URL}/user_leagues`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `token ${token}`
      }
    })
      .then(response => response.json())
      .then(leagues => dispatch(setLeagues(leagues)))
      .catch(error => console.log(error));
  };
};
