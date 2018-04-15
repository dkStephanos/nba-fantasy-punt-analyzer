import { auth } from '../utils/init';

const YAHOO_API_URL = process.env.YAHOO_API_BASE_URL;
const RAILS_API_URL = process.env.RAILS_API_URL;
const gameId = process.env.GAME_ID;

// ** Action Creators **
const setPlayers = (players, playerStart) => {
  return {
    type: 'GET_PLAYERS_SUCCESS',
    players,
    playerStart
  };
};

// ** Async Actions **
export const getFreeAgents = (leagueKey, playerStart = 1) => {
  const token = auth.getToken();
  return dispatch => {
    return fetch(`${RAILS_API_URL}/free_agents`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        LeagueKey: `${leagueKey}`,
        start: `${playerStart}`
      }
    })
      .then(response => response.json())
      .then(players => dispatch(setPlayers(players, playerStart)))
      .catch(error => console.log(error));
  };
};

