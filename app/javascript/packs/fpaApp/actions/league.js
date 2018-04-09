import { auth } from '../utils/init';
let fastXmlParser = require('fast-xml-parser');

const API_URL = process.env.YAHOO_API_BASE_URL;
const appUri = "http://stephanos.pagekite.me/";
const gameId = process.env.GAME_ID;
const token = auth.getToken();

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
export const getLeagueById = leagueId => {
  return dispatch => {
    return fetch(`${API_URL}/leagues/${leagueId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
      .then(response => fastXmlParser.parse(response))
      .then(league => dispatch(setLeague(league)))
      .catch(error => console.log(error));
  };
};

export const getLeagues = () => {
  return dispatch => {
    return fetch(`${API_URL}/users;use_login=1/games;game_keys=${gameId}/leagues`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => fastXmlParser.parse(response))
      .then(leagues => dispatch(setLeagues(leagues)))
      .catch(error => console.log(error));
  };
};
